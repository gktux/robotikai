"use client";

import { useAdmin } from "./AdminContext";

export function PartnerAddForm({ 
  addAction 
}: { 
  addAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await addAction(fd);
          showToast("Sponsor başarıyla eklendi", "success");
          (document.querySelector('form[id="add-partner-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Sponsor eklenirken bir hata oluştu", "error");
        }
      }} 
      id="add-partner-form"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Kurum Adı</label>
        <input
          name="name"
          required
          placeholder="Kurum adı..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Logo URL</label>
        <input
          name="logo"
          required
          placeholder="/uploads/logo.png"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Web Sitesi</label>
        <input
          name="link"
          placeholder="https://..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-fuchsia-600 py-4 text-sm font-black text-white shadow-xl shadow-fuchsia-900/20 transition-all hover:bg-fuchsia-500 hover:-translate-y-0.5 active:scale-95"
      >
        Sponsoru Kaydet
      </button>
    </form>
  );
}
