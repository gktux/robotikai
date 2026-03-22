"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/admin/login/actions";
import { AdminProvider } from "./admin/AdminContext";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminProvider>
      <div className="flex min-h-[calc(100vh-64px)] gap-6 transition-colors duration-300">
      <aside className="w-52 shrink-0 border-r border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          ROBOTIKAI Admin
        </p>
        <nav className="space-y-1 text-sm">
          <Link
            href="/admin"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname === "/admin"
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Kontrol Paneli
          </Link>
          <Link
            href="/admin/content"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/content")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Ana Sayfa & Hakkında
          </Link>
          <Link
            href="/admin/security"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/security")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Güvenlik İzleme
          </Link>
          <Link
            href="/admin/settings"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/settings")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Site Ayarları
          </Link>
          <Link
            href="/admin/announcements"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/announcements")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Duyurular
          </Link>
          <Link
            href="/admin/news"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/news")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Haberler
          </Link>
          <Link
            href="/admin/partners"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/partners")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Sponsorlar
          </Link>
          <Link
            href="/admin/courses"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/courses")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Eğitimler
          </Link>
          <Link
            href="/admin/products"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/products")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Ürünler
          </Link>
          <Link
            href="/admin/blog-posts"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/blog-posts")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Blog Yazıları
          </Link>
          <Link
            href="/admin/messages"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/messages")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Mesajlar
          </Link>
          <Link
            href="/admin/faq"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/faq")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            SSS
          </Link>
          <Link
            href="/admin/orders"
            className={`block rounded-lg px-3 py-2 transition ${
              pathname?.startsWith("/admin/orders")
                ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
            }`}
          >
            Siparişler
          </Link>
          <form action={logoutAdmin} className="mt-4 border-t border-slate-200/60 pt-4 dark:border-slate-800">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Güvenli Çıkış Yap
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 text-slate-900 dark:text-slate-100">{children}</div>
    </div>
    </AdminProvider>
  );
}
