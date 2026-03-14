import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { EditorField } from "@/components/EditorField";

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
                  <div className="flex flex-col gap-2">
                    <EditorField 
                      name="content" 
                      defaultValue={(post as { content?: string }).content} 
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 italic">💡 Not: Editör zengin metin formatını (kalın, italik, liste vb.) destekler.</span>
                      <button
                        type="submit"
                        className="whitespace-nowrap rounded-full bg-sky-500 px-6 py-2 text-xs font-bold text-white transition hover:bg-sky-400 shadow-sm dark:bg-sky-600 dark:hover:bg-sky-500"
                      >
                        Değişiklikleri Kaydet
                      </button>
                    </div>
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
            <EditorField name="content" />
            <p className="text-[10px] text-slate-500 italic">💡 Not: Editör aracılığıyla resim ekleyebilir ve metni biçimlendirebilirsiniz.</p>
          </div>
          <button
            type="submit"
            className="rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Yazıyı Ekle
          </button>
        </form>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-sky-100 bg-sky-50/30 p-6 text-sm dark:border-sky-900/30 dark:bg-sky-900/10">
        <h3 className="font-bold text-sky-900 dark:text-sky-300 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          Yeni Görsel Editör Kullanımı
        </h3>
        <p className="text-slate-700 dark:text-slate-300">
          Artık yazılarınızı daha kolay yazabilmeniz için <strong>zengin metin editörü</strong> eklendi. 
          Toolbar'daki butonları kullanarak şunları yapabilirsiniz:
        </p>
        <div className="grid gap-6 md:grid-cols-2 text-xs leading-relaxed text-sky-800/80 dark:text-sky-400/80">
          <div className="space-y-2">
            <p className="font-bold border-b border-sky-200 pb-1 dark:border-sky-800">🖼️ Resim & Dosya</p>
            <p>Toolbar'daki resim ikonuna tıklayarak bilgisayarınızdan resim seçip yazıya anında ekleyebilirsiniz.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold border-b border-sky-200 pb-1 dark:border-sky-800">✍️ Biçimlendirme</p>
            <p>Metni seçip <strong>B</strong>, <em>I</em> veya <u>U</u> ikonlarına basarak kalın, italik veya altı çizili yapabilirsiniz.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold border-b border-sky-200 pb-1 dark:border-sky-800">🔗 Linkler</p>
            <p>Herhangi bir metni seçip link ikonuna basarak tıklanabilir bağlantılar ekleyebilirsiniz.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold border-b border-sky-200 pb-1 dark:border-sky-800">📋 Listeler & Başlıklar</p>
            <p>Madde işaretli listeler veya hiyerarşik başlıklar (H1, H2) oluşturabilirsiniz.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

