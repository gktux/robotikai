import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { FaqManager, FaqHeaderForm, FaqAddForm } from "@/components/admin/FaqManager";

async function updateFaq(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString() ?? "";
  const intro = formData.get("intro")?.toString() ?? "";
  
  const locale = await getLocale();
  const current = readCms(locale);

  writeCms({
    faq: { ...current.faq, title, intro, items: current.faq?.items ?? [] }
  }, locale);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

async function addFaqItem(formData: FormData) {
  "use server";
  const q = formData.get("question")?.toString().trim() ?? "";
  const a = formData.get("answer")?.toString().trim() ?? "";
  if (!q) return;
  
  const locale = await getLocale();
  const current = readCms(locale);
  
  const items = current.faq?.items ?? [];
  const maxId = items.reduce((m: number, x: { id: number }) => (x.id > m ? x.id : m), 0);
  items.push({ id: maxId + 1, question: q, answer: a });
  
  writeCms({
    faq: { ...current.faq, title: current.faq?.title ?? "SSS", intro: current.faq?.intro ?? "", items }
  }, locale);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

async function deleteFaqItem(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  
  const locale = await getLocale();
  const current = readCms(locale);

  writeCms({
    faq: {
      ...current.faq,
      items: (current.faq?.items ?? []).filter((x: { id: number }) => x.id !== id)
    }
  }, locale);

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export default async function AdminFaqPage() {
  const cms = await readCmsWithLocale();
  const faq = cms.faq ?? { title: "SSS", intro: "", items: [] };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • SSS
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Yardım Merkezi
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Sıkça sorulan soruları, sayfa başlıklarını ve içeriklerini buradan yönetebilirsin.
        </p>
      </header>

      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-3 mb-6">
           <div className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
           </div>
           <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
              SSS Sayfa Başlıkları
           </h2>
        </div>
        <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/80">
            <FaqHeaderForm initialData={faq} updateAction={updateFaq} />
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr,400px]">
        {/* Sol Column: Mevcut Sorular */}
        <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
                    Mevcut Sorular
                </h2>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">{faq.items?.length || 0} SORU</span>
            </div>
            
            <FaqManager items={faq.items || []} deleteAction={deleteFaqItem} />
        </section>

        {/* Sağ Column: Yeni Ekle */}
        <section className="space-y-6">
            <div className="sticky top-24 rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Yeni Soru Ekle</h2>
                    <p className="text-xs text-sky-500 font-bold mt-1 uppercase tracking-widest">Bilgi Bankasını Genişlet</p>
                </div>
                
                <FaqAddForm addAction={addFaqItem} />
            </div>
        </section>
      </div>
    </div>
  );
}
