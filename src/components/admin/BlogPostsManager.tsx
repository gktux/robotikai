"use client";

import { useAdmin } from "./AdminContext";
import { CollapsibleSection } from "./CollapsibleSection";
import { EditorField } from "@/components/EditorField";

interface BlogPostItem {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  image?: string;
}

export function BlogPostsManager({ 
  items, 
  updateAction, 
  deleteAction 
}: { 
  items: BlogPostItem[];
  updateAction: (fd: FormData) => Promise<void>;
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast, confirm } = useAdmin();

  const handleUpdate = async (fd: FormData) => {
    try {
      await updateAction(fd);
      showToast("Yazı başarıyla güncellendi", "success");
    } catch (e) {
      showToast("Güncelleme başarısız", "error");
    }
  };

  const handleDelete = async (fd: FormData) => {
    const ok = await confirm({
      title: "Blog Yazısını Sil",
      message: "Bu yazıyı silmek istediğine emin misin? Bu işlem geri alınamaz.",
      confirmText: "Evet, Sil",
      type: "danger"
    });

    if (ok) {
      try {
        await deleteAction(fd);
        showToast("Yazı silindi", "success");
      } catch (e) {
        showToast("Silme işlemi başarısız", "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      {items.map((post) => (
        <CollapsibleSection 
          key={post.id} 
          title={post.title} 
          badge={post.category}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
        >
          <div className="grid gap-4">
            <form action={handleUpdate} className="space-y-4" id={`update-blog-form-${post.id}`}>
              <input type="hidden" name="id" value={post.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Başlık</label>
                  <input
                    name="title"
                    defaultValue={post.title}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Kategori</label>
                  <input
                    name="category"
                    defaultValue={post.category}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-sky-600 dark:border-slate-800 dark:bg-slate-950 dark:text-sky-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Kapak Resmi URL</label>
                <input
                  name="image"
                  defaultValue={post.image}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Kısa Özet</label>
                <textarea
                  name="excerpt"
                  defaultValue={post.excerpt}
                  rows={2}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 transition-all resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Detay İçerik</label>
                <EditorField 
                  name="content" 
                  defaultValue={post.content} 
                />
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 mt-4 pt-5">
                <button
                    type="button"
                    onClick={() => handleDelete(new FormData(document.getElementById(`update-blog-form-${post.id}`) as HTMLFormElement))}
                    className="text-[11px] font-black text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 uppercase tracking-widest group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                    Yazıyı Sil
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-sky-500 px-8 py-3 text-xs font-black text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20 active:scale-95 flex items-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  Bilgileri Güncelle
                </button>
              </div>
            </form>
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
}

export function BlogPostAddForm({ 
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
          showToast("Yazı başarıyla paylaşıldı", "success");
          (document.querySelector('form[id="add-blog-post-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Yazı eklenirken hata oluştu", "error");
        }
      }} 
      id="add-blog-post-form"
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="title-blog-add">Başlık</label>
          <input
            id="title-blog-add"
            name="title"
            required
            placeholder="Örn: Yapay Zeka ve Robotik"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all font-bold"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="category-blog-add">Kategori</label>
          <input
            id="category-blog-add"
            name="category"
            required
            placeholder="Örn: Teknoloji"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="image-blog-add">Kapak Resmi URL</label>
        <input
          id="image-blog-add"
          name="image"
          placeholder="https://... veya /uploads/..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="excerpt-blog-add">Kısa Özet</label>
        <textarea
          id="excerpt-blog-add"
          name="excerpt"
          required
          rows={2}
          placeholder="Yazının anasayfada görünecek özeti..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all resize-none shadow-sm"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="content-blog-add">Detay İçerik (Opsiyonel)</label>
        <EditorField name="content" />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 py-4 text-sm font-black text-white transition hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-[0.99] dark:bg-sky-600 dark:hover:bg-sky-500 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Blog Yazısını Paylaş
      </button>
    </form>
  );
}
