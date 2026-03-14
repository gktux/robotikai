import { readCmsWithLocale, writeCms, getLocale } from "@/lib/cms";

async function updateSettings(formData: FormData) {
  "use server";
  const brandName = formData.get("brandName")?.toString() ?? "";
  const tagline = formData.get("tagline")?.toString() ?? "";
  const footerLine1 = formData.get("footerLine1")?.toString() ?? "";
  const footerLine2 = formData.get("footerLine2")?.toString() ?? "";
  const contactEmail = formData.get("contactEmail")?.toString() ?? "";
  const contactPhone = formData.get("contactPhone")?.toString() ?? "";
  const contactAddress = formData.get("contactAddress")?.toString() ?? "";

  const locale = await getLocale();

  writeCms({
    site: {
      brandName,
      tagline,
      footerLine1,
      footerLine2,
    },
    contact: {
      intro: "", // Retained via partial merge logic in writeCms
      infoText: "", 
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
    },
  }, locale);
}

export default async function AdminSettingsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Site Ayarları
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Metin ve İletişim Ayarları
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Site adı, alt başlık, footer yazıları ve iletişim bilgilerini buradan
          güncelleyebilirsin. Kod tarafına dokunmana gerek yok.
        </p>
      </header>

      <form action={updateSettings} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Genel Site Bilgileri
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="brandName">
                Site Adı / Marka
              </label>
              <input
                id="brandName"
                name="brandName"
                defaultValue={cms.site.brandName}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700 dark:text-slate-400" htmlFor="tagline">
                Kısa Açıklama (Tagline)
              </label>
              <input
                id="tagline"
                name="tagline"
                defaultValue={cms.site.tagline}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="footerLine1"
              >
                Footer Satır 1
              </label>
              <input
                id="footerLine1"
                name="footerLine1"
                defaultValue={cms.site.footerLine1}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="footerLine2"
              >
                Footer Satır 2
              </label>
              <input
                id="footerLine2"
                name="footerLine2"
                defaultValue={cms.site.footerLine2}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            İletişim Bilgileri
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="contactEmail"
              >
                E-posta
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                defaultValue={cms.contact.email}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="contactPhone"
              >
                Telefon
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                defaultValue={cms.contact.phone}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-[11px] text-slate-700 dark:text-slate-400"
                htmlFor="contactAddress"
              >
                Adres
              </label>
              <input
                id="contactAddress"
                name="contactAddress"
                defaultValue={cms.contact.address}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/20 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

