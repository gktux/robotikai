"use client";

import { useAdmin } from "./AdminContext";

export function HomeContentForm({ 
  initialData, 
  updateAction 
}: { 
  initialData: any;
  updateAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await updateAction(fd);
          showToast("Ana sayfa içeriği güncellendi", "success");
        } catch (e) {
          showToast("Güncelleme başarısız", "error");
        }
      }} 
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
           <div className="h-8 w-8 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
           </div>
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Ana Sayfa Hero Bölümü
           </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Üst Rozet (Badge)</label>
          <input name="badge" defaultValue={initialData.badge} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Ana Başlık (Satır 1)</label>
          <input name="titleLine1" defaultValue={initialData.titleLine1} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 font-bold" />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-amber-500 px-1">Başlık Vurgu (Highlight)</label>
          <input name="titleHighlight" defaultValue={initialData.titleHighlight} className="w-full rounded-2xl border border-slate-200 bg-amber-50/30 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-amber-400 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-100" />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Alt Başlık (Açıklama)</label>
          <textarea name="subtitle" defaultValue={initialData.subtitle} rows={3} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 transition-all font-medium" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Pill 1 (Sol/Üst)</label>
           <div className="flex gap-2">
             <input name="pill1Title" defaultValue={initialData.pill1Title} placeholder="Başlık" className="w-[100px] shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-black text-sky-600 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950" />
             <input name="pill1Text" defaultValue={initialData.pill1Text} placeholder="Metin" className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950" />
           </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Pill 2 (Sağ/Alt)</label>
           <div className="flex gap-2">
             <input name="pill2Title" defaultValue={initialData.pill2Title} placeholder="Başlık" className="w-[100px] shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-black text-rose-500 outline-none focus:border-rose-400 dark:border-slate-800 dark:bg-slate-950" />
             <input name="pill2Text" defaultValue={initialData.pill2Text} placeholder="Metin" className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 outline-none focus:border-rose-400 dark:border-slate-800 dark:bg-slate-950" />
           </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Etkileşimli Kart (Simülasyon Alanı)</h3>
        </div>
        
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-1">Kart Ana Başlık</label>
            <input name="cardTitle" defaultValue={initialData.cardTitle} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-indigo-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-300" />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Eğitim Modu</label>
            <input name="cardModTitle" defaultValue={initialData.cardModTitle} placeholder="Mod Başlık" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950" />
            <textarea name="cardModText" defaultValue={initialData.cardModText} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-xs text-slate-500 outline-none resize-none font-medium" rows={2} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Eğitim Süresi</label>
            <input name="cardDuration" defaultValue={initialData.cardDuration} placeholder="Süre Başlık" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950" />
            <textarea name="cardDurationText" defaultValue={initialData.cardDurationText} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-xs text-slate-500 outline-none resize-none font-medium" rows={2} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Seviye Bilgisi</label>
            <input name="cardLevel" defaultValue={initialData.cardLevel} placeholder="Seviye Başlık" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950" />
            <textarea name="cardLevelText" defaultValue={initialData.cardLevelText} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-xs text-slate-500 outline-none resize-none font-medium" rows={2} />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Kart Alt Metin</label>
            <input name="cardBottomText" defaultValue={initialData.cardBottomText} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 px-1">Kart Alt Rozet</label>
            <input name="cardBottomBadge" defaultValue={initialData.cardBottomBadge} className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-[10px] font-black text-indigo-600 outline-none focus:border-indigo-400 dark:border-indigo-900/30 dark:bg-indigo-950 uppercase tracking-[0.2em]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="rounded-full bg-sky-600 px-10 py-4 text-sm font-black text-white hover:bg-sky-500 shadow-xl shadow-sky-600/20 transition-all active:scale-95 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Tüm Değişiklikleri Uygula
        </button>
      </div>
    </form>
  );
}

export function AboutContentForm({ 
  initialData, 
  updateAction 
}: { 
  initialData: any;
  updateAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await updateAction(fd);
          showToast("Hakkında sayfası güncellendi", "success");
        } catch (e) {
          showToast("Güncelleme başarısız", "error");
        }
      }} 
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
           <div className="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
           </div>
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Hakkımızda Sayfası
           </h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Ana Başlık</label>
          <input name="title" defaultValue={initialData.title} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 shadow-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Hikayemiz (Paragraf 1)</label>
          <textarea name="p1" defaultValue={initialData.paragraphs[0]} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Misyonumuz (Paragraf 2)</label>
          <textarea name="p2" defaultValue={initialData.paragraphs[1]} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Vizyonumuz (Paragraf 3)</label>
          <textarea name="p3" defaultValue={initialData.paragraphs[2]} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 font-medium" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button type="submit" className="rounded-full bg-emerald-600 px-10 py-4 text-sm font-black text-white hover:bg-emerald-500 shadow-xl shadow-emerald-600/20 transition-all active:scale-95 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            İçeriği Güncelle
        </button>
      </div>
    </form>
  );
}
