import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { EditorField } from "@/components/EditorField";
import { CollapsibleSection } from "@/components/admin/CollapsibleSection";
import { DeleteButton } from "@/components/admin/DeleteButton";

async function addPost(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const image = formData.get("image")?.toString().trim() ?? "";

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
          image,
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
  const image = formData.get("image")?.toString().trim() ?? "";

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
          image,
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

      <section className="mb-8 space-y-4">
        <h2 className="px-1 text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          Mevcut Blog Yazıları
        </h2>
        <div className="space-y-4">
          {cms.blog.items.map((post: any) => (
            <CollapsibleSection 
              key={post.id} 
              title={post.title} 
              badge={post.category}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
            >
              <div className="grid gap-4">
                <form action={updatePost} className="space-y-4">
                  <input type="hidden" name="id" value={post.id} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Başlık</label>
                      <input
                        name="title"
                        defaultValue={post.title}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Kategori</label>
                      <input
                        name="category"
                        defaultValue={post.category}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Kapak Resmi URL</label>
                    <input
                      name="image"
                      defaultValue={post.image}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      placeholder="/uploads/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Kısa Özet</label>
                    <textarea
                      name="excerpt"
                      defaultValue={post.excerpt}
                      rows={2}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Detay İçerik</label>
                    <EditorField 
                      name="content" 
                      defaultValue={(post as { content?: string }).content} 
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-sky-500 px-8 py-2.5 text-xs font-bold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
                    >
                      💾 Değişiklikleri Kaydet
                    </button>
                  </div>
                </form>
                <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <DeleteButton 
                      label="Yazıyı Tamamen Sil" 
                      confirmMessage="Bu yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz." 
                    />
                  </form>
                </div>
              </div>
            </CollapsibleSection>
          ))}
          {cms.blog.items.length === 0 && (
             <div className="py-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">Henüz hiç blog yazısı eklenmemiş.</p>
             </div>
          )}
        </div>
      </section>

      <CollapsibleSection 
        title="Yeni Yazı Ekle" 
        defaultOpen={false}
        className="border-sky-200 bg-sky-50/20 dark:border-sky-900/40 dark:bg-sky-950/20"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>}
      >
        <form action={addPost} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="title">Başlık</label>
              <input
                id="title"
                name="title"
                required
                placeholder="Örn: Arduino ile Mesafe Sensörü Kullanımı"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="category">Kategori</label>
              <input
                id="category"
                name="category"
                required
                placeholder="Örn: Robotik"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="image">Kapak Resmi URL</label>
            <input
              id="image"
              name="image"
              placeholder="https://... veya /uploads/..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="excerpt">Kısa Özet</label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={2}
              placeholder="Yazının anasayfada görünecek kısa özeti..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400" htmlFor="content">Detay İçerik (opsiyonel)</label>
            <EditorField name="content" />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-sky-600 py-3 text-xs font-bold text-white transition hover:bg-sky-500 shadow-lg shadow-sky-600/20"
          >
            🚀 Yazıyı Paylaş
          </button>
        </form>
      </CollapsibleSection>

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

