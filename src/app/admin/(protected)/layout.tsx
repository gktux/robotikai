import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("robotikai_admin");

  // CRITICAL SECURITY: If the session is missing, invalid, or using the old insecure value, redirect to login.
  // This is a server-side check that runs before any components inside are rendered.
  if (!session || !session.value || session.value === "authenticated") {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
