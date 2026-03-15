import Link from "next/link";
import { readCmsWithLocale } from "@/lib/cms";
import { CourseSearch } from "@/components/CourseSearch";

export default async function CoursesPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-950/30 dark:text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {cms.courses.badge}
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900 dark:text-slate-100">
          {cms.courses.title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600 dark:text-slate-400">
          {cms.courses.intro}
        </p>
      </header>

      <CourseSearch courses={cms.courses.items} />
    </div>
  );
}

