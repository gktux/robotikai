"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { checkRateLimit, logFailedAttempt, resetAttempts } from "@/lib/security";

// Hardcoded yetkisiz erişimi engellemek için basit bir kontrol
// Daha sonra process.env üzerinden alınabilir.
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "robotikai2024";
const SESSION_SECRET = process.env.SESSION_SECRET || "robotikai-ultra-secret-2024-v1";

export async function loginAdmin(formData: FormData) {
  // 1. Check rate limit and block if necessary
  const rateLimit = await checkRateLimit();
  
  if (!rateLimit.allowed) {
    redirect(`/admin/login?error=blocked&retryIn=${rateLimit.retryIn}`);
  }

  // 2. Apply dynamic delay to slow down automated brute-force attacks
  if (rateLimit.delay && rateLimit.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, rateLimit.delay));
  }

  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  // 3. Validation
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    
    // Reset failed attempts on success
    await resetAttempts();

    // Use a more secure session token instead of just "authenticated"
    // In a real app, this should be a JWT or a session ID stored in a DB
    const sessionToken = Buffer.from(`${username}:${SESSION_SECRET}:${Date.now()}`).toString('base64');

    // Cookie oluştur (7 gün geçerli)
    cookieStore.set("robotikai_admin", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    redirect("/admin");
  } else {
    // 4. Log failed attempt for brute-force protection
    await logFailedAttempt();
    revalidatePath("/admin/security");
    
    // Şifre yanlışsa tekrar login sayfasına yönlendirip hata parametresi ekle
    redirect("/admin/login?error=invalid_credentials");
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("robotikai_admin");
  redirect("/admin/login");
}
