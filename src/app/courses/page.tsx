import Link from "next/link";
import { readCmsWithLocale } from "@/lib/cms";

export default async function CoursesPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {cms.courses.badge}
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          {cms.courses.title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600">{cms.courses.intro}</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 animate-fade-up delay-100">
        {cms.courses.items.map((course, idx) => (
          <article
            key={course.id}
            className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50"
            style={{ animationDelay: `${(idx % 3) * 100}ms` }}
          >
            <div className="mb-4 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-medium bg-neutral-100 px-2 py-1 rounded-md">{course.level} Seviye</span>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                {course.duration}
              </span>
            </div>
            <Link href={`/courses/${course.id}`}>
              <h2 className="mb-2.5 text-lg font-bold text-neutral-900 transition-colors group-hover:text-indigo-600">
                {course.title}
              </h2>
            </Link>
            <p className="mb-6 text-[13px] text-neutral-600 leading-relaxed">
              {course.highlight}
            </p>
            <div className="mt-auto flex items-center justify-between text-[11px]">
              <span className="font-medium text-neutral-500 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"/><rect x="3" y="6" width="12" height="12" rx="2" ry="2"/></svg>
                Canlı + Kayıtlı
              </span>
              <Link
                href={`/courses/${course.id}`}
                className="rounded-full bg-indigo-500 px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-indigo-600 hover:shadow-indigo-500/30 active:scale-95"
              >
                Detay &gt;
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

