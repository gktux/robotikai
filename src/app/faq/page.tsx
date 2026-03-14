import { readCmsWithLocale } from "@/lib/cms";

export default async function FaqPage() {
  const cms = await readCmsWithLocale();
  const faq = cms.faq ?? {
    title: "Sıkça Sorulan Sorular",
    intro: "",
    items: [],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/70 bg-fuchsia-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-600">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          ROBOTIKAI • SSS
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          {faq.title}
        </h1>
        {faq.intro && (
          <p className="max-w-2xl text-sm md:text-base text-neutral-600">{faq.intro}</p>
        )}
      </header>

      <div className="space-y-4 animate-fade-up delay-100">
        {faq.items.map((item, idx) => (
          <details
            key={item.id}
            className="group rounded-3xl border border-neutral-200/80 bg-white p-5 md:p-6 shadow-sm transition-all duration-300 hover:border-fuchsia-300 hover:shadow-md animate-fade-up"
            style={{ animationDelay: `${(idx % 10) * 50}ms` }}
          >
            <summary className="cursor-pointer list-none font-bold text-neutral-900 [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4">
              <span className="text-base md:text-lg">{item.question}</span>
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 text-neutral-500 transition-transform duration-300 group-open:rotate-180 group-open:bg-fuchsia-100 group-open:text-fuchsia-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <p className="mt-4 pt-4 border-t border-neutral-100 text-sm md:text-[15px] text-neutral-600 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
