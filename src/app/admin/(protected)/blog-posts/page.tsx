import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { BlogPostsManager, BlogPostAddForm } from "@/components/admin/BlogPostsManager";

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
  revalidatePath("/admin/blog-posts");
  revalidatePath("/");
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
  revalidatePath("/admin/blog-posts");
  revalidatePath("/");
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
  revalidatePath("/admin/blog-posts");
  revalidatePath("/");
}

export default async function AdminBlogPostsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Blog
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Blog Yönetimi
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Sitedeki makaleleri, eğitim yazılarını ve teknoloji haberlerini buradan yönetebilirsin.
        </p>
      </header>

      <section className="mb-14 space-y-6">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
              Yayınlanmış Yazılar
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">{cms.blog.items.length} YAZI</span>
        </div>
        
        <BlogPostsManager 
            items={cms.blog.items} 
            updateAction={updatePost} 
            deleteAction={deletePost} 
        />
      </section>

      <section className="space-y-6 rounded-[3.5rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Yeni Blog Yazısı Başlat</h2>
            <p className="text-xs text-sky-500 font-bold mt-1 uppercase tracking-widest">Bilgi Paylaş</p>
        </div>
        
        <BlogPostAddForm addAction={addPost} />
      </section>

      <section className="mt-12 space-y-4 rounded-3xl border border-sky-100 bg-sky-50/20 p-8 text-sm dark:border-sky-900/30 dark:bg-sky-900/10">
        <h3 className="font-black text-sky-900 dark:text-sky-300 flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          Editör Rehberi
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Zengin metin editörü ile yazılarınıza resim, link ve başlıklar ekleyebilir, metinlerinizi özgürce biçimlendirebilirsiniz. 
        </p>
      </section>
    </div>
  );
}
