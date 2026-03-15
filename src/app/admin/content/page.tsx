import { readCmsWithLocale, writeCms, getLocale } from "@/lib/cms";

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
}

export default async function AdminContentPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • İçerik
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Ana Sayfa & Hakkında
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Ana sayfa hero metinleri ve Hakkında sayfası içeriklerini buradan
          düzenle.
        </p>
      </header>

      <form action={updateHome} className="mb-10 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="text-sm font-semibold dark:text-slate-100">Ana Sayfa Hero</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Badge</label>
            <input name="badge" defaultValue={cms.home.badge} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık 1</label>
            <input name="titleLine1" defaultValue={cms.home.titleLine1} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık vurgu</label>
            <input name="titleHighlight" defaultValue={cms.home.titleHighlight} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Alt başlık</label>
            <textarea name="subtitle" defaultValue={cms.home.subtitle} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
            <p className="text-[10px] text-slate-500 italic">💡 Not: Alt satırlar otomatik korunur.</p>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Pil 1 başlık</label>
            <input name="pill1Title" defaultValue={cms.home.pill1Title} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Pil 1 metin</label>
            <input name="pill1Text" defaultValue={cms.home.pill1Text} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Pil 2 başlık</label>
            <input name="pill2Title" defaultValue={cms.home.pill2Title} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Pil 2 metin</label>
            <input name="pill2Text" defaultValue={cms.home.pill2Text} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
        </div>

        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">Kart İçeriği (Simülasyon Alanı)</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-3 space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Kart Üst Başlık</label>
            <input name="cardTitle" defaultValue={cms.home.cardTitle} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Mod Başlık</label>
            <input name="cardModTitle" defaultValue={cms.home.cardModTitle} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Süre Başlık</label>
            <input name="cardDuration" defaultValue={cms.home.cardDuration} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Seviye Başlık</label>
            <input name="cardLevel" defaultValue={cms.home.cardLevel} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Mod Metin</label>
            <textarea name="cardModText" defaultValue={cms.home.cardModText} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Süre Metin</label>
            <textarea name="cardDurationText" defaultValue={cms.home.cardDurationText} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Seviye Metin</label>
            <textarea name="cardLevelText" defaultValue={cms.home.cardLevelText} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Kart Alt Metin</label>
            <input name="cardBottomText" defaultValue={cms.home.cardBottomText} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Kart Alt Rozet</label>
            <input name="cardBottomBadge" defaultValue={cms.home.cardBottomBadge} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
        </div>
        <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500">
          Ana Sayfayı Kaydet
        </button>
      </form>

      <form action={updateAbout} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="text-sm font-semibold dark:text-slate-100">Hakkında Sayfası</h2>
        <p className="text-[10px] text-slate-500 italic mb-2">💡 Not: Her paragrafa girdiğiniz alt satırlar sitede otomatik korunur.</p>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Başlık</label>
            <input name="title" defaultValue={cms.about.title} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Paragraf 1</label>
            <textarea name="p1" defaultValue={cms.about.paragraphs[0]} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Paragraf 2</label>
            <textarea name="p2" defaultValue={cms.about.paragraphs[1]} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-400">Paragraf 3</label>
            <textarea name="p3" defaultValue={cms.about.paragraphs[2]} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500" />
          </div>
        </div>
        <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500">
          Hakkında Kaydet
        </button>
      </form>
    </div>
  );
}
