import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";

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
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • SSS
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Sıkça Sorulan Sorular Yönetimi
        </h1>
      </header>

      <form action={updateFaq} className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-700 dark:text-slate-400">Başlık</label>
          <input
            name="title"
            defaultValue={faq.title}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] text-slate-700 dark:text-slate-400">Giriş metni</label>
          <input
            name="intro"
            defaultValue={faq.intro}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
          />
        </div>
        <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500">
          Kaydet
        </button>
      </form>

      <section className="mb-8 space-y-3">
        <h2 className="text-sm font-semibold dark:text-slate-100">Mevcut sorular</h2>
        {(faq.items ?? []).map((item: { id: number; question: string; answer: string }) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="font-medium text-slate-900 dark:text-slate-100">{item.question}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
            <form action={deleteFaqItem} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-600 hover:underline dark:text-red-400">
                Sil
              </button>
            </form>
          </div>
        ))}
      </section>

      <form action={addFaqItem} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="text-sm font-semibold dark:text-slate-100">Yeni soru ekle</h2>
        <input
          name="question"
          placeholder="Soru"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500 text-slate-900"
        />
        <textarea
          name="answer"
          placeholder="Cevap"
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500 text-slate-900"
        />
        <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500">
          Ekle
        </button>
      </form>
    </div>
  );
}
