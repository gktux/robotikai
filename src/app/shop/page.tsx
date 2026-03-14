import { readCmsWithLocale } from "@/lib/cms";
import { ShopGrid } from "@/components/ShopGrid";

export default async function ShopPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-10 space-y-3 animate-fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
          {cms.shop.badge}
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-neutral-900">
          {cms.shop.title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600">{cms.shop.intro}</p>
      </header>

      <ShopGrid items={cms.shop.items} />
    </div>
  );
}

