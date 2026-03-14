import { readCmsWithLocale } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cms = await readCmsWithLocale();
  const product = cms.shop.items.find((p) => p.id === Number(id));
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14 animate-fade-in">
      <Link href="/shop" className="mb-6 inline-block text-sm text-sky-600 hover:underline">
        ← Ürünlere dön
      </Link>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <span className="rounded-full bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-700">
          {product.tag}
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">
          {product.name}
        </h1>
        <p className="mt-4 text-slate-600">{product.info}</p>
        {(product as { description?: string }).description && (
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {(product as { description?: string }).description}
          </p>
        )}
        <p className="mt-4 text-xl font-semibold text-emerald-600">{product.price}</p>
        <div className="mt-6">
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
            priceValue={(product as any).priceValue}
            image={(product as any).image}
          />
        </div>
      </article>
    </div>
  );
}
