import Link from "next/link";
import { readCmsWithLocale } from "@/lib/cms";

export default async function BlogPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/70 bg-fuchsia-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-600">
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          {cms.blog.badge}
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          {cms.blog.title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600">{cms.blog.intro}</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 animate-fade-up delay-100">
        {cms.blog.items.map((post, idx) => (
          <article
            key={post.id}
            className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-xl hover:shadow-fuchsia-100/50"
            style={{ animationDelay: `${(idx % 3) * 100}ms` }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-500">
              {post.category}
            </p>
            <Link href={`/blog/${post.id}`}>
              <h2 className="mb-3 text-lg font-bold text-neutral-900 transition-colors group-hover:text-fuchsia-600 leading-tight">
                {post.title}
              </h2>
            </Link>
            <p className="mb-6 text-[13px] text-neutral-600 leading-relaxed">{post.excerpt}</p>
            <Link
              href={`/blog/${post.id}`}
              className="mt-auto w-max rounded-full bg-neutral-100 px-4 py-2 text-[11px] font-bold text-neutral-700 transition-all group-hover:bg-fuchsia-50 group-hover:text-fuchsia-700"
            >
              Yazıyı Oku <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

