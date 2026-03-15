import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { EditorField } from "@/components/EditorField";
import { CollapsibleSection } from "@/components/admin/CollapsibleSection";
import { DeleteButton } from "@/components/admin/DeleteButton";

async function addCourse(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const level = formData.get("level")?.toString().trim() ?? "";
  const duration = formData.get("duration")?.toString().trim() ?? "";
  const highlight = formData.get("highlight")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (!title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    courses: {
      ...current.courses,
      items: [
        ...items,
        {
          id: maxId + 1,
          title,
          level,
          duration,
          highlight,
          content,
        },
      ],
    },
  }, locale);
}

async function deleteCourse(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  
  writeCms({
    courses: {
      ...current.courses,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
}

async function updateCourse(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const title = formData.get("title")?.toString().trim() ?? "";
  const level = formData.get("level")?.toString().trim() ?? "";
  const duration = formData.get("duration")?.toString().trim() ?? "";
  const highlight = formData.get("highlight")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          level,
          duration,
          highlight,
          content,
        }
      : item
  );

  writeCms({
    courses: {
      ...current.courses,
      items: updatedItems,
    },
  }, locale);
}

export default async function AdminCoursesPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
          ROBOTIKAI • Eğitimler
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Eğitim Programları Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Buradan sitede görünen eğitim programlarını ekleyebilir, düzenleyebilir
          veya silebilirsin. /courses sayfası her zaman bu listedeki verileri
          kullanır.
        </p>
      </header>

      <section className="mb-8 space-y-4">
        <h2 className="px-1 text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          Mevcut Eğitim Programları
        </h2>
        <div className="space-y-4">
          {cms.courses.items.map((course: any) => (
            <CollapsibleSection 
              key={course.id} 
              title={course.title} 
              badge={`${course.level} Seviye`}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
            >
              <div className="grid gap-4">
                <form action={updateCourse} className="space-y-4">
                  <input type="hidden" name="id" value={course.id} />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Başlık</label>
                      <input
                        name="title"
                        defaultValue={course.title}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Seviye</label>
                      <input
                        name="level"
                        defaultValue={course.level}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Süre</label>
                      <input
                        name="duration"
                        defaultValue={course.duration}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Kısa Açıklama (Highlight)</label>
                    <input
                      name="highlight"
                      defaultValue={course.highlight}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Detay İçerik</label>
                    <EditorField 
                      name="content" 
                      defaultValue={(course as { content?: string }).content} 
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-indigo-500 px-8 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-400 shadow-lg shadow-indigo-500/20"
                    >
                      💾 Değişiklikleri Kaydet
                    </button>
                  </div>
                </form>
                <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                  <form action={deleteCourse}>
                    <input type="hidden" name="id" value={course.id} />
                    <DeleteButton 
                      label="Eğitimi Tamamen Sil" 
                      confirmMessage="Bu eğitim programını silmek istediğinize emin misiniz? Bu işlem geri alınamaz." 
                    />
                  </form>
                </div>
              </div>
            </CollapsibleSection>
          ))}
          {cms.courses.items.length === 0 && (
             <div className="py-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">Henüz hiç eğitim programı eklenmemiş.</p>
             </div>
          )}
        </div>
      </section>

      <CollapsibleSection 
        title="Yeni Eğitim Ekle" 
        defaultOpen={false}
        className="border-indigo-200 bg-indigo-50/20 dark:border-indigo-900/40 dark:bg-indigo-950/20"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>}
      >
        <form action={addCourse} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
             <div className="space-y-1.5 md:col-span-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="title">Başlık</label>
                <input
                  id="title"
                  name="title"
                  required
                  placeholder="Örn: İleri Seviye Robotik"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="level">Seviye</label>
                <input
                  id="level"
                  name="level"
                  required
                  placeholder="Örn: Başlangıç"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="duration">Süre</label>
                <input
                  id="duration"
                  name="duration"
                  required
                  placeholder="Örn: 8 Hafta"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
             </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="highlight">Kısa Açıklama</label>
            <input
              id="highlight"
              name="highlight"
              required
              placeholder="Programın kısa, çarpıcı özeti..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="content">Detay İçerik (opsiyonel)</label>
            <EditorField name="content" />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 py-3 text-xs font-bold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
          >
            🚀 Eğitimi Yayınla
          </button>
        </form>
      </CollapsibleSection>
    </div>
  );
}

