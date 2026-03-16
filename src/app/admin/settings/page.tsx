import { readCmsWithLocale, writeCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { SettingsForm } from "@/components/admin/SettingsForm";

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

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export default async function AdminSettingsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Ayarlar
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Sistem Ayarları
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Site genelindeki marka metinlerini, footer bilgilerini ve iletişim kanallarını buradan merkezi olarak güncelleyebilirsin.
        </p>
      </header>

      <SettingsForm cms={cms} updateAction={updateSettings} />
    </div>
  );
}
