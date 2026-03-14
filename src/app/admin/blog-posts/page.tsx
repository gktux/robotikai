import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";

async function addPost(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (!title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.blog.items as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    blog: {
      ...current.blog,
      items: [
        ...items,
        {
          id: maxId + 1,
          title,
          category,
          excerpt,
          content,
        },
      ],
    },
  }, locale);
}

async function deletePost(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.blog.items as any[];
  
  writeCms({
    blog: {
      ...current.blog,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
}

async function updatePost(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const title = formData.get("title")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.blog.items as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          category,
          excerpt,
          content,
        }
      : item
  );

  writeCms({
    blog: {
      ...current.blog,
      items: updatedItems,
    },
  }, locale);
}

export default async function AdminBlogPostsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Blog
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Blog Yazıları Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Buradan sitede görünen blog yazılarını ekleyebilir, düzenleyebilir
          veya silebilirsin. /blog sayfası her zaman bu listedeki verileri
          kullanır.
        </p>
      </header>

      <section className="mb-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Mevcut Blog Yazıları
        </h2>
        <div className="space-y-3">
          {cms.blog.items.map((post: any) => (
            <div
              key={post.id}
              className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 md:grid-cols-[1.6fr,0.9fr,auto] dark:border-slate-800 dark:bg-slate-800/50"
            >
              <form action={updatePost} className="contents">
                <input type="hidden" name="id" value={post.id} />
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık</label>
                  <input
                    name="title"
                    defaultValue={post.title}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">
                    Kategori
                  </label>
                  <input
                    name="category"
                    defaultValue={post.category}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-3">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">
                    Kısa Özet
                  </label>
                  <input
                    name="excerpt"
                    defaultValue={post.excerpt}
                    className="mb-2 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
                  />
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">
                    Detay İçerik (opsiyonel)
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      name="content"
                      defaultValue={(post as { content?: string }).content}
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
              <form action={deletePost} className="mt-1 md:col-span-3">
                <input type="hidden" name="id" value={post.id} />
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
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Yeni Yazı Ekle</h2>
        <form action={addPost} className="space-y-3">
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
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="category"
              >
                Kategori
              </label>
              <input
                id="category"
                name="category"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="excerpt">
              Kısa Özet
            </label>
            <input
              id="excerpt"
              name="excerpt"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
            />
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
            Yazıyı Ekle
          </button>
        </form>
      </section>
    </div>
  );
}

