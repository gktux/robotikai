import { readCmsWithLocale } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cms = await readCmsWithLocale();
  const post = cms.blog.items.find((p) => p.id === Number(id));
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 animate-fade-in">
      <Link href="/blog" className="mb-6 inline-block text-sm text-sky-600 hover:underline">
        ← Bloğa dön
      </Link>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs uppercase tracking-wider text-slate-500">{post.category}</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
          {post.title}
        </h1>
        <p className="mt-4 text-slate-600">{post.excerpt}</p>
        {(post as any).content && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <MarkdownContent content={(post as any).content ?? ""} />
          </div>
        )}
      </article>
    </div>
  );
}
