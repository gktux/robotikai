import { readCmsWithLocale } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ScrollReveal } from "@/components/ScrollReveal";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cms = await readCmsWithLocale();
  const course = cms.courses.items.find((c) => c.id === Number(id));
  if (!course) notFound();

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
        <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-[120px] dark:bg-sky-500/10" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Navigation */}
        <ScrollReveal direction="down">
          <Link 
            href="/courses" 
            className="group mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
            Tüm Eğitimlere Dön
          </Link>
        </ScrollReveal>

        <article className="space-y-10">
          {/* Header Section */}
          <ScrollReveal>
            <header className="space-y-6">
              <div className="flex gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 dark:bg-indigo-950/30 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  {course.level} SEVİYE
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {course.duration}
                </div>
              </div>
              
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-slate-100 leading-[1.1]">
                {course.title}
              </h1>

              <div className="flex items-center gap-4 border-l-2 border-indigo-500/20 pl-6 py-2">
                <p className="text-lg font-medium text-slate-500 md:text-xl dark:text-slate-400 leading-relaxed">
                  {course.highlight}
                </p>
              </div>
            </header>
          </ScrollReveal>

          {/* Body Content */}
          <ScrollReveal delay={0.3}>
            <div className="rounded-[3rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-16 dark:border-slate-800/50 dark:bg-slate-900/40 dark:shadow-none backdrop-blur-sm">
              <div className="mb-12 flex items-center justify-between border-b border-slate-100 pb-8 dark:border-slate-800">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Ön Kayıt</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">Şimdi Başvur</span>
                 </div>
                 <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20"
                  >
                    Kayıt Ol 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
              </div>
              
              {(course as any).content && (
                <MarkdownContent content={(course as any).content} />
              )}
            </div>
          </ScrollReveal>
        </article>

        {/* Footer Navigation */}
        <ScrollReveal delay={0.4}>
          <footer className="mt-20 border-t border-slate-100 pt-12 text-center dark:border-slate-800">
             <p className="mb-6 text-sm font-bold text-slate-400 dark:text-slate-500">Geleceği RobotikAI ile kodlayın.</p>
             <Link 
              href="/courses" 
              className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 hover:scale-105 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-500 dark:hover:text-white"
            >
              Tüm Eğitim Programlarını Gör
            </Link>
          </footer>
        </ScrollReveal>
      </div>
    </div>
  );
}
