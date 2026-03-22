import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { NewsManager } from "@/components/admin/NewsManager";
import { NewsAddForm } from "@/components/admin/NewsForms";

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
  revalidatePath("/admin/news");
  revalidatePath("/");
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
  revalidatePath("/admin/news");
  revalidatePath("/");
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
  revalidatePath("/admin/news");
  revalidatePath("/");
}

export default async function AdminNewsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Haberler
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Haber Yönetimi
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Anasayfada yanyana kayan haber şeridini buradan yönetebilirsin.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        {/* Sol: Mevcut Haberler */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Yayınlanmış Haberler
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase">{cms.news?.items?.length || 0} İçerik</span>
          </div>
          
          <NewsManager 
            items={cms.news?.items || []} 
            updateAction={updateNews} 
            deleteAction={deleteNews} 
          />
        </section>

        {/* Sağ: Yeni Ekle */}
        <section className="space-y-6">
          <div className="sticky top-24 rounded-[3rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none transition-all">
            <div className="mb-8">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Yeni Haber Ekle</h2>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Haber Akışına Ekle</p>
            </div>
            
            <NewsAddForm addAction={addNews} />
          </div>
        </section>
      </div>
    </div>
  );
}
