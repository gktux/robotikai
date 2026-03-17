"use client";

import { useAdmin } from "./AdminContext";
import { ImageUploadField } from "./ImageUploadField";

interface PartnerItem {
  id: number;
  name: string;
  logo?: string;
  link?: string;
}

export function PartnersManager({ 
  items, 
  updateAction, 
  deleteAction 
}: { 
  items: PartnerItem[];
  updateAction: (fd: FormData) => Promise<void>;
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast, confirm } = useAdmin();

  const handleUpdate = async (fd: FormData) => {
    try {
      await updateAction(fd);
      showToast("Sponsor bilgileri güncellendi", "success");
    } catch (e) {
      showToast("Güncelleme başarısız", "error");
    }
  };

  const handleDelete = async (fd: FormData) => {
    const ok = await confirm({
      title: "Sponsoru Sil",
      message: "Bu sponsoru silmek istediğine emin misin?",
      confirmText: "Evet, Sil",
      type: "danger"
    });

    if (ok) {
      try {
        await deleteAction(fd);
        showToast("Sponsor kaldırıldı", "success");
      } catch (e) {
        showToast("Silme işlemi başarısız", "error");
      }
    }
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-xs text-slate-500 italic p-6 border border-dashed border-slate-200 rounded-2xl dark:border-slate-800 text-center">Henüz sponsor eklenmemiş.</p>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 md:grid-cols-[1.2fr,1.5fr,1.3fr,auto] dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all hover:shadow-md"
        >
          <form action={handleUpdate} className="contents">
            <input type="hidden" name="id" value={item.id} />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Kurum Adı</label>
              <input
                name="name"
                defaultValue={item.name}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-fuchsia-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <ImageUploadField
                name="logo"
                defaultValue={item.logo}
                label="Logo"
            />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Web Sitesi</label>
              <input
                name="link"
                defaultValue={item.link}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-fuchsia-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                placeholder="https://..."
              />
            </div>
            <div className="flex items-end gap-2">
               <button
                type="submit"
                className="group flex h-[42px] w-[42px] items-center justify-center rounded-2xl bg-fuchsia-500 text-white transition hover:bg-fuchsia-400 shadow-lg shadow-fuchsia-500/20 active:scale-95"
                title="Güncelle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              </button>
            </div>
          </form>
          <form action={handleDelete} className="flex items-end">
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-2xl bg-red-100 text-red-600 transition hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400 shadow-sm active:scale-95"
              title="Sil"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
