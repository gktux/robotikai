import { readCmsWithLocale, writeCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { HomeContentForm, AboutContentForm } from "@/components/admin/ContentForms";

async function updateHome(formData: FormData) {
  "use server";
  
  const locale = await getLocale();

  writeCms({
    home: {
      badge: formData.get("badge")?.toString() ?? "",
      titleLine1: formData.get("titleLine1")?.toString() ?? "",
      titleHighlight: formData.get("titleHighlight")?.toString() ?? "",
      subtitle: formData.get("subtitle")?.toString() ?? "",
      pill1Title: formData.get("pill1Title")?.toString() ?? "",
      pill1Text: formData.get("pill1Text")?.toString() ?? "",
      pill2Title: formData.get("pill2Title")?.toString() ?? "",
      pill2Text: formData.get("pill2Text")?.toString() ?? "",
      cardTitle: formData.get("cardTitle")?.toString() ?? "",
      cardModTitle: formData.get("cardModTitle")?.toString() ?? "",
      cardModText: formData.get("cardModText")?.toString() ?? "",
      cardDuration: formData.get("cardDuration")?.toString() ?? "",
      cardDurationText: formData.get("cardDurationText")?.toString() ?? "",
      cardLevel: formData.get("cardLevel")?.toString() ?? "",
      cardLevelText: formData.get("cardLevelText")?.toString() ?? "",
      cardBottomText: formData.get("cardBottomText")?.toString() ?? "",
      cardBottomBadge: formData.get("cardBottomBadge")?.toString() ?? "",
    } as any
  }, locale);
  revalidatePath("/admin/content");
  revalidatePath("/");
}

async function updateAbout(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString() ?? "";
  const p1 = formData.get("p1")?.toString() ?? "";
  const p2 = formData.get("p2")?.toString() ?? "";
  const p3 = formData.get("p3")?.toString() ?? "";
  
  const locale = await getLocale();

  writeCms({
    about: { title, paragraphs: [p1, p2, p3].filter(Boolean) }
  }, locale);
  revalidatePath("/admin/content");
  revalidatePath("/about");
}

export default async function AdminContentPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • İçerik
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Sayfa Yapılandırması
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Ana sayfa hero metinleri, etkileşimli kart verileri ve Hakkında sayfası içeriklerini buradan düzenleyebilirsin.
        </p>
      </header>

      <section className="mb-12 space-y-6 rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <HomeContentForm initialData={cms.home} updateAction={updateHome} />
      </section>

      <section className="space-y-6 rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <AboutContentForm initialData={cms.about} updateAction={updateAbout} />
      </section>
    </div>
  );
}
