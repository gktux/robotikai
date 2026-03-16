"use client";

import { useAdmin } from "./AdminContext";
import { CollapsibleSection } from "./CollapsibleSection";
import { EditorField } from "@/components/EditorField";

interface CourseItem {
  id: number;
  title: string;
  level: string;
  duration: string;
  highlight: string;
  content?: string;
  regLabel?: string;
  regTitle?: string;
  regButton?: string;
  regLink?: string;
  regEnabled?: boolean;
}

export function CoursesManager({ 
  items, 
  updateAction, 
  deleteAction 
}: { 
  items: CourseItem[];
  updateAction: (fd: FormData) => Promise<void>;
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast, confirm } = useAdmin();

  const handleUpdate = async (fd: FormData) => {
    try {
      await updateAction(fd);
      showToast("Eğitim başarıyla güncellendi", "success");
    } catch (e) {
      showToast("Güncelleme başarısız", "error");
    }
  };

  const handleDelete = async (fd: FormData) => {
    const ok = await confirm({
      title: "Eğitimi Sil",
      message: "Bu eğitim programını silmek istediğine emin misin? Bu işlem geri alınamaz.",
      confirmText: "Evet, Sil",
      type: "danger"
    });

    if (ok) {
      try {
        await deleteAction(fd);
        showToast("Eğitim silindi", "success");
      } catch (e) {
        showToast("Silme işlemi başarısız", "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      {items.map((course) => (
        <CollapsibleSection 
          key={course.id} 
          title={course.title} 
          badge={`${course.level} Seviye`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
        >
          <div className="grid gap-4">
            <form action={handleUpdate} className="space-y-4">
              <input type="hidden" name="id" value={course.id} />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-1">Başlık</label>
                  <input
                    name="title"
                    defaultValue={course.title}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-1">Seviye</label>
                  <input
                    name="level"
                    defaultValue={course.level}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-1">Süre</label>
                  <input
                    name="duration"
                    defaultValue={course.duration}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all font-semibold"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-1">Kısa Açıklama (Highlight)</label>
                <input
                  name="highlight"
                  defaultValue={course.highlight}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
                />
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Kayıt / Başvuru Alanı</h3>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" name="regEnabled" defaultChecked={course.regEnabled !== false} className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Aktif</span>
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Etiket</label>
                    <input name="regLabel" defaultValue={course.regLabel ?? "Ön Kayıt"} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Başlık</label>
                    <input name="regTitle" defaultValue={course.regTitle ?? "Şimdi Başvur"} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Buton</label>
                    <input name="regButton" defaultValue={course.regButton ?? "Kayıt Ol"} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Hedef Link</label>
                    <input name="regLink" defaultValue={course.regLink ?? "/contact"} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest px-1">Detay İçerik</label>
                <EditorField 
                  name="content" 
                  defaultValue={course.content} 
                />
              </div>
              
              <div className="flex justify-between items-center pt-2 gap-4">
                <form action={handleDelete} className="contents">
                    <input type="hidden" name="id" value={course.id} />
                    <button
                        type="submit"
                        className="text-[11px] font-black text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 uppercase tracking-widest px-2 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        Tamamen Sil
                    </button>
                </form>
                <button
                  type="submit"
                  className="rounded-full bg-emerald-500 px-8 py-3 text-xs font-black text-white transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
}

export function CourseAddForm({ 
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
          showToast("Eğitim başarıyla eklendi", "success");
          (document.querySelector('form[id="add-course-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Eğitim eklenirken hata oluştu", "error");
        }
      }} 
      id="add-course-form"
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-3">
         <div className="space-y-1.5 md:col-span-1">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="title-add">Başlık</label>
            <input
              id="title-add"
              name="title"
              required
              placeholder="Örn: İleri Robotik"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
            />
         </div>
         <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="level-add">Seviye</label>
            <input
              id="level-add"
              name="level"
              required
              placeholder="Örn: Başlangıç"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
            />
         </div>
         <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="duration-add">Süre</label>
            <input
              id="duration-add"
              name="duration"
              required
              placeholder="Örn: 8 Hafta"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
            />
         </div>
      </div>
      
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="highlight-add">Kısa Açıklama</label>
        <input
          id="highlight-add"
          name="highlight"
          required
          placeholder="Program özeti..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 transition-all"
        />
      </div>

      <div className="rounded-[2rem] border border-indigo-100 bg-indigo-50/20 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/20">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Kayıt / Başvuru Parametreleri</h3>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" name="regEnabled" defaultChecked={true} className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
            <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">Aktif</span>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Etiket</label>
            <input name="regLabel" defaultValue="Ön Kayıt" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Başlık</label>
            <input name="regTitle" defaultValue="Şimdi Başvur" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Buton Metni</label>
            <input name="regButton" defaultValue="Kayıt Ol" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 font-semibold" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Hedef Link</label>
            <input name="regLink" defaultValue="/contact" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="content-add">Detay İçerik (Opsiyonel)</label>
        <EditorField name="content" />
      </div>
      
      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 py-4 text-sm font-black text-white transition hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Eğitim Programını Yayınla
      </button>
    </form>
  );
}
