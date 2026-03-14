import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";

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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Eğitimler
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Eğitim Listesi Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Buradan sitede görünen eğitim kartlarını ekleyebilir, düzenleyebilir
          veya silebilirsin. /courses sayfası her zaman bu listedeki verileri
          kullanır.
        </p>
      </header>

      <section className="mb-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mevcut Eğitimler</h2>
        <div className="space-y-3">
          {cms.courses.items.map((course: any) => (
            <div
              key={course.id}
              className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 md:grid-cols-[1.5fr,1fr,1fr,auto] dark:border-slate-800 dark:bg-slate-800/50"
            >
              <form action={updateCourse} className="contents">
                <input type="hidden" name="id" value={course.id} />
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık</label>
                  <input
                    name="title"
                    defaultValue={course.title}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Seviye</label>
                  <input
                    name="level"
                    defaultValue={course.level}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Süre</label>
                  <input
                    name="duration"
                    defaultValue={course.duration}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-4">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">
                    Kısa Açıklama
                  </label>
                  <input
                    name="highlight"
                    defaultValue={course.highlight}
                    className="mb-2 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">
                    Detay İçerik (opsiyonel)
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      name="content"
                      defaultValue={(course as { content?: string }).content}
                      rows={2}
                      className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              </form>
              <form action={deleteCourse} className="mt-1 md:col-span-4">
                <input type="hidden" name="id" value={course.id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Yeni Eğitim Ekle</h2>
        <form action={addCourse} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="title">
                Başlık
              </label>
              <input
                id="title"
                name="title"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="level">
                Seviye
              </label>
              <input
                id="level"
                name="level"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="duration">
                Süre
              </label>
              <input
                id="duration"
                name="duration"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="highlight"
              >
                Kısa Açıklama
              </label>
              <input
                id="highlight"
                name="highlight"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="content">
              Detay İçerik (opsiyonel)
            </label>
            <textarea
              id="content"
              name="content"
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Eğitimi Ekle
          </button>
        </form>
      </section>
    </div>
  );
}

