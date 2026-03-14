"use client";

import { useSearchParams } from "next/navigation";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 animate-fade-in relative z-10 w-full h-full pb-20">
      <div className="w-full max-w-md rounded-[2rem] border border-neutral-200/80 bg-white p-8 shadow-2xl shadow-indigo-100/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Güvenli Yönetim Paneli
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Lütfen devam etmek için yönetici kimlik bilgilerinizi girin.
          </p>
        </div>

        {error === "invalid_credentials" && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 flex items-start gap-3 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="font-medium">Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.</p>
          </div>
        )}

        <form action={loginAdmin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 ml-1" htmlFor="username">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10"
              placeholder="admin"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 ml-1" htmlFor="password">
              Yönetici Şifresi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 tracking-widest"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-neutral-900 px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 mt-2"
          >
            Sisteme Giriş Yap
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-neutral-400">
          <p>Yetkisiz erişim IP loglarına kaydedilmektedir.</p>
        </div>
      </div>
    </div>
  );
}
