"use client";

import { useAdmin } from "./AdminContext";

export function AnnouncementHeadersForm({ 
  initialData, 
  updateAction 
}: { 
  initialData: { badge?: string; title?: string; intro?: string };
  updateAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await updateAction(fd);
          showToast("Bölüm başlıkları güncellendi", "success");
        } catch (e) {
          showToast("Güncelleme başarısız", "error");
        }
      }} 
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Üst Rozet (Badge)</label>
          <input 
            name="badge" 
            defaultValue={initialData.badge} 
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Bölüm Başlığı</label>
          <input 
            name="title" 
            defaultValue={initialData.title} 
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Giriş Metni (Intro)</label>
        <textarea 
          name="intro" 
          rows={2}
          defaultValue={initialData.intro} 
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
        />
      </div>
      <button type="submit" className="rounded-full bg-slate-900 px-8 py-3 text-xs font-black text-white transition hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 shadow-lg shadow-slate-900/10 active:scale-95">
        Bölüm Bilgilerini Güncelle
      </button>
    </form>
  );
}

export function AnnouncementAddForm({ 
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
          showToast("Duyuru başarıyla eklendi", "success");
          (document.querySelector('form[id="add-announcement-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Duyuru eklenemedi", "error");
        }
      }} 
      id="add-announcement-form"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Başlık</label>
        <input 
          name="title" 
          required 
          placeholder="Başlık girin..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">İçerik</label>
        <textarea 
          name="content" 
          rows={3} 
          placeholder="Duyuru içeriği..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
        />
      </div>
      <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Tarih</label>
          <input 
            name="date" 
            defaultValue={new Date().toLocaleDateString("tr-TR")} 
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" 
          />
      </div>
      <div className="flex items-center gap-3 py-2">
          <input type="checkbox" name="isImportant" id="new-isImportant" className="h-5 w-5 rounded-lg border-slate-300 text-sky-500" />
          <label htmlFor="new-isImportant" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Önemli Duyuru</label>
      </div>
      <button type="submit" className="w-full rounded-full bg-sky-500 py-4 text-sm font-black text-white shadow-xl shadow-sky-500/20 transition hover:bg-sky-400 hover:shadow-sky-500/40 active:scale-95">
        Yayınla
      </button>
    </form>
  );
}
