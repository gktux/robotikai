"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Hardcoded yetkisiz erişimi engellemek için basit bir kontrol
// Daha sonra process.env üzerinden alınabilir.
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "robotikai2024";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  // Basit validasyon
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    
    // Cookie oluştur (7 gün geçerli)
    cookieStore.set("robotikai_admin", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    redirect("/admin");
  } else {
    // Şifre yanlışsa tekrar login sayfasına yönlendirip hata parametresi ekle
    redirect("/admin/login?error=invalid_credentials");
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("robotikai_admin");
  redirect("/admin/login");
}
