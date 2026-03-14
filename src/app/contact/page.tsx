import { readCmsWithLocale } from "@/lib/cms";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
          ROBOTIKAI • İletişim
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          Bizimle iletişime geç
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600">{cms.contact.intro}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[2fr,1.2fr] animate-fade-up delay-100">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm">
          <ContactForm />
        </div>

        {/* İletişim bilgileri */}
        <aside className="space-y-4 text-sm text-neutral-600">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-neutral-900">
              İletişim Bilgileri
            </h2>
            <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">{cms.contact.infoText}</p>
            <div className="space-y-4 text-[13px]">
              <p className="flex flex-col gap-1.5">
                <span className="text-neutral-400 font-semibold uppercase tracking-[0.1em] text-[10px]">E-posta / E-mail</span>{" "}
                <span className="text-violet-700 font-medium bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-lg w-max inline-block transition-colors hover:bg-violet-100">{cms.contact.email}</span>
              </p>
              <p className="flex flex-col gap-1.5">
                <span className="text-neutral-400 font-semibold uppercase tracking-[0.1em] text-[10px]">Telefon</span>{" "}
                <span className="text-neutral-800 font-medium px-1">{cms.contact.phone}</span>
              </p>
              <p className="flex flex-col gap-1.5">
                <span className="text-neutral-400 font-semibold uppercase tracking-[0.1em] text-[10px]">Adres</span>{" "}
                <span className="text-neutral-700 font-medium px-1 leading-relaxed">{cms.contact.address}</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

