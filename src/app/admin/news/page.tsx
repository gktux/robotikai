import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import Link from "next/link";

async function addNews(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString().trim() ?? "";
  const link = formData.get("link")?.toString().trim() ?? "";
  const image = formData.get("image")?.toString().trim() ?? "";

  if (!title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.news?.items || []) as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    news: {
      ...current.news,
      items: [
        ...items,
        {
          id: maxId + 1,
          title,
          date: date || new Date().toLocaleDateString("tr-TR"),
          link,
          image,
        },
      ],
    },
  }, locale);
}

async function deleteNews(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.news?.items || []) as any[];
  
  writeCms({
    news: {
      ...current.news,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
}

async function updateNews(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const title = formData.get("title")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString().trim() ?? "";
  const link = formData.get("link")?.toString().trim() ?? "";
  const image = formData.get("image")?.toString().trim() ?? "";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.news?.items || []) as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          date,
          link,
          image,
        }
      : item
  );

  writeCms({
    news: {
      ...current.news,
      items: updatedItems,
    },
  }, locale);
}

export default async function AdminNewsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Haberler
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Haber Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Anasayfada yanyana kayan haberleri buradan yönetebilirsin.
        </p>
      </header>

      <section className="mb-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Mevcut Haberler
        </h2>
        <div className="space-y-3">
          {(cms.news?.items || []).map((item: any) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 md:grid-cols-[1.6fr,1.6fr,0.9fr,auto] dark:border-slate-800 dark:bg-slate-800/50"
            >
              <form action={updateNews} className="contents">
                <input type="hidden" name="id" value={item.id} />
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık</label>
                  <input
                    name="title"
                    defaultValue={item.title}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Resim URL</label>
                  <input
                    name="image"
                    defaultValue={item.image}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                    placeholder="/uploads/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Link</label>
                  <input
                    name="link"
                    defaultValue={item.link}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-600 dark:text-slate-400">Tarih</label>
                    <input
                      name="date"
                      defaultValue={item.date}
                      className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-[32px] rounded-lg bg-sky-500 px-3 text-xs font-bold text-white transition hover:bg-sky-400"
                  >
                    💾
                  </button>
                </div>
              </form>
              <form action={deleteNews} className="flex items-end">
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="h-[32px] rounded-lg bg-red-100 px-3 text-xs font-bold text-red-600 transition hover:bg-red-200"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Yeni Haber Ekle</h2>
        <form action={addNews} className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Başlık</label>
            <input
              name="title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Resim URL</label>
            <input
              name="image"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="/uploads/..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Link</label>
            <input
              name="link"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Tarih</label>
            <input
              name="date"
              defaultValue={new Date().toLocaleDateString("tr-TR")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 rounded-full bg-sky-500 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-sky-400"
          >
            Haber Ekle
          </button>
        </form>
      </section>
    </div>
  );
}
