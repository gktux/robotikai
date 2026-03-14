import { readCmsWithLocale } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cms = await readCmsWithLocale();
  const course = cms.courses.items.find((c) => c.id === Number(id));
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14 animate-fade-in">
      <Link href="/courses" className="mb-6 inline-block text-sm text-sky-600 hover:underline">
        ← Eğitimlere dön
      </Link>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-sky-50 px-3 py-0.5 font-semibold text-sky-700">
            {course.level}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-slate-600">
            {course.duration}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
          {course.title}
        </h1>
        <p className="mt-4 text-slate-600">{course.highlight}</p>
        {(course as any).content && (
          <div className="mt-4">
            <MarkdownContent content={(course as any).content} />
          </div>
        )}
        <a
          href="/contact"
          className="mt-6 inline-block rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Kayıt Ol
        </a>
      </article>
    </div>
  );
}
