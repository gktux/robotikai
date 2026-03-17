"use client";

import { useAdmin } from "./AdminContext";
import { ImageUploadField } from "./ImageUploadField";

export function NewsAddForm({ 
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
          showToast("Haber başarıyla eklendi", "success");
          (document.querySelector('form[id="add-news-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Haber eklenirken bir hata oluştu", "error");
        }
      }} 
      id="add-news-form"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Başlık</label>
        <input
          name="title"
          required
          placeholder="Haber başlığı..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <ImageUploadField
        name="image"
        label="Haber Görseli"
        placeholder="Görsel URL veya dosya seçin"
      />
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Haber Linki</label>
        <input
          name="link"
          placeholder="https://..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Haber Tarihi</label>
        <input
          name="date"
          defaultValue={new Date().toLocaleDateString("tr-TR")}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 dark:bg-sky-600 dark:hover:bg-sky-500 dark:shadow-sky-500/20"
      >
        Haber Yayınla
      </button>
    </form>
  );
}
