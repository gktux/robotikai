"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

type Product = {
  id: number;
  name: string;
  price: string;
  priceValue?: number;
  image?: string;
  tag: string;
  info: string;
};

export function ShopGrid({ items }: { items: Product[] }) {
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc">("default");

  const sortedItems = useMemo(() => {
    if (sortOption === "default") return items;
    
    return [...items].sort((a, b) => {
      // Fallback behavior if priceValue isn't accurately seeded yet
      const valA = a.priceValue ?? (parseInt(a.price.replace(/[^0-9]/g, "")) || 0);
      const valB = b.priceValue ?? (parseInt(b.price.replace(/[^0-9]/g, "")) || 0);
      
      return sortOption === "price-asc" ? valA - valB : Math.abs(valB) - Math.abs(valA);
    });
  }, [items, sortOption]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between animate-fade-up">
        <p className="text-sm font-medium text-neutral-500">
          <span className="text-indigo-600 font-bold">{items.length}</span> ürün listeleniyor
        </p>
        
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-xs font-semibold text-neutral-500">
            Sırala:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none rounded-full border border-neutral-200 bg-white/50 pl-4 pr-10 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur-md transition-all hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="default">Önerilen (Varsayılan)</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 animate-fade-up delay-100">
        {sortedItems.map((product, idx) => (
          <article
            key={product.id}
            className="group flex flex-col rounded-[2rem] border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 p-2"
            style={{ animationDelay: `${(idx % 3) * 100}ms` }}
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-neutral-100">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-50/50 to-violet-50/50 text-indigo-300/50 transition-colors group-hover:from-indigo-100/50 group-hover:to-violet-100/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-sm group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                    <rect width="18" height="18" x="3" y="3" rx="4" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="mt-2 text-[10px] font-semibold text-indigo-400">Görsel Yüklenmedi</span>
                </div>
              )}
              
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-indigo-600 shadow-sm">
                  {product.tag}
                </span>
              </div>
            </div>

            {/* Content Box */}
            <div className="flex flex-1 flex-col p-4 pt-5">
              <div className="mb-1 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-medium text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Stokta
                </span>
                <span className="font-extrabold text-lg text-neutral-900 tabular-nums tracking-tight">
                  {product.price}
                </span>
              </div>
              <Link href={`/shop/${product.id}`} className="mt-2">
                <h2 className="mb-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-indigo-600 leading-tight">
                  {product.name}
                </h2>
              </Link>
              <p className="mb-6 text-[13px] text-neutral-600 leading-relaxed text-balance line-clamp-3 ml-1">{product.info}</p>
              
              <div className="mt-auto w-full pt-2">
                <AddToCartButton
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  priceValue={product.priceValue}
                  image={product.image}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
