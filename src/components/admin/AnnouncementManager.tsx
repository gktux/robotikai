"use client";

import { useState } from "react";
import { useAdmin } from "./AdminContext";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

export function AnnouncementManager({ 
  items, 
  updateAction, 
  deleteAction 
}: { 
  items: Announcement[];
  updateAction: (fd: FormData) => Promise<void>;
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const { showToast, confirm } = useAdmin();

  const handleDelete = async (formData: FormData) => {
    const ok = await confirm({
      title: "Duyuruyu Sil",
      message: "Bu duyuruyu silmek istediğine emin misin? Bu işlem geri alınamaz.",
      confirmText: "Evet, Sil",
      cancelText: "Vazgeç",
      type: "danger"
    });

    if (ok) {
      try {
        await deleteAction(formData);
        showToast("Duyuru başarıyla silindi", "success");
      } catch (error) {
        showToast("Duyuru silinirken bir hata oluştu", "error");
      }
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateAction(formData);
      setEditingItem(null);
      showToast("Duyuru güncellendi", "success");
    } catch (error) {
      showToast("Güncelleme sırasında bir hata oluştu", "error");
    }
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-xs text-slate-500 italic p-6 border border-dashed border-slate-200 rounded-2xl dark:border-slate-800 text-center">Henüz duyuru eklenmemiş.</p>
      )}
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md ${item.isImportant ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10' : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900/40'}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white dark:bg-slate-800">#{item.id}</span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate max-w-[200px] md:max-w-md">{item.title}</h3>
                {item.isImportant && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">Önemli</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-[11px] font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/10 transition-all hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  Düzenle
                </button>
                <form action={handleDelete} className="inline">
                  <input type="hidden" name="id" value={item.id} />
                  <button 
                    type="submit"
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400 transition-colors"
                    title="Sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 pt-3">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.date}</span>
               <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">{item.content || "İçerik yok"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Duyuruyu Düzenle</h3>
                <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest text-sky-500">ID: #{editingItem.id}</p>
              </div>
              <button 
                onClick={() => setEditingItem(null)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <form action={handleUpdate} className="space-y-5">
              <input type="hidden" name="id" value={editingItem.id} />
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Başlık</label>
                <input 
                  name="title" 
                  defaultValue={editingItem.title}
                  required 
                  autoFocus
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">İçerik</label>
                <textarea 
                  name="content" 
                  defaultValue={editingItem.content}
                  rows={4} 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Tarih</label>
                  <input 
                    name="date" 
                    defaultValue={editingItem.date}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all" 
                  />
                </div>
                <div className="flex items-center gap-3 pt-6 group cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isImportant" 
                    id="modal-isImportant" 
                    defaultChecked={editingItem.isImportant} 
                    className="h-6 w-6 rounded-lg border-slate-300 text-sky-500 focus:ring-sky-500 cursor-pointer" 
                  />
                  <label htmlFor="modal-isImportant" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer group-hover:text-amber-500 transition-colors">Önemli Duyuru</label>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 rounded-full border border-slate-200 py-4 text-sm font-black text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                >
                  Vazgeç
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] rounded-full bg-sky-500 py-4 text-sm font-black text-white shadow-xl shadow-sky-500/20 transition-all hover:bg-sky-400 hover:shadow-sky-500/40 active:scale-[0.98]"
                >
                  ✅ Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
