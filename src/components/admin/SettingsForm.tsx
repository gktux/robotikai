"use client";

import { useAdmin } from "./AdminContext";

export function SettingsForm({ 
  cms, 
  updateAction 
}: { 
  cms: any;
  updateAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await updateAction(fd);
          showToast("Sistem ayarları başarıyla kaydedildi", "success");
        } catch (e) {
          showToast("Ayarlar kaydedilirken hata oluştu", "error");
        }
      }} 
      className="space-y-8"
    >
      <section className="space-y-6 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <div className="flex items-center gap-3 mb-2">
             <div className="h-8 w-8 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             </div>
             <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Genel Marka Ayarları
             </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="brandName">Marka Adı</label>
            <input
              id="brandName"
              name="brandName"
              defaultValue={cms.site.brandName}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="tagline">Slogan / Tagline</label>
            <input
              id="tagline"
              name="tagline"
              defaultValue={cms.site.tagline}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="footerLine1">Footer Satır 1 (Sol)</label>
            <input
              id="footerLine1"
              name="footerLine1"
              defaultValue={cms.site.footerLine1}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="footerLine2">Footer Satır 2 (Sağ)</label>
            <input
              id="footerLine2"
              name="footerLine2"
              defaultValue={cms.site.footerLine2}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <div className="flex items-center gap-3 mb-2">
             <div className="h-8 w-8 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
             </div>
             <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
                İletişim Kanalları
             </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="contactEmail">E-posta Adresi</label>
            <input
              id="contactEmail"
              name="contactEmail"
              defaultValue={cms.contact.email}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="contactPhone">Telefon Numarası</label>
            <input
              id="contactPhone"
              name="contactPhone"
              defaultValue={cms.contact.phone}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="contactAddress">Fiziksel Adres</label>
            <input
              id="contactAddress"
              name="contactAddress"
              defaultValue={cms.contact.address}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="rounded-full bg-slate-900 px-10 py-4 text-sm font-black text-white transition hover:bg-slate-800 shadow-xl shadow-slate-900/20 active:scale-95 flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Sistem Ayarlarını Güncelle
        </button>
      </div>
    </form>
  );
}
