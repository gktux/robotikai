import { readCmsWithLocale } from "@/lib/cms";

export default async function AboutPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          ROBOTIKAI • Hakkında
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          {cms.about.title}
        </h1>
      </header>

      <div className="space-y-6 text-sm md:text-base text-neutral-600 animate-fade-up delay-200 leading-relaxed bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm">
        {cms.about.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
  );
}

