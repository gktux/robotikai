"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
}

interface BlogSearchProps {
  posts: BlogPost[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Suggestions logic: top 3-4 matches based on title
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return posts
      .filter(p => p.title.toLowerCase().includes(lowerQuery))
      .slice(0, 4);
  }, [query, posts]);

  // Actual filtered posts for the grid
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lowerQuery = query.toLowerCase();
    return posts.filter(
      p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery) ||
        p.excerpt.toLowerCase().includes(lowerQuery)
    );
  }, [query, posts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-12">
      {/* Search Bar Section */}
      <div ref={containerRef} className="relative z-[60] mx-auto max-w-2xl animate-fade-up delay-75">
        <div className="relative group">
          <div className="absolute inset-0 bg-fuchsia-500/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Yazı ara (Başlık, kategori veya içerik...)"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 100) setQuery(val); // Limit search length
              }}
              onFocus={() => setIsFocused(true)}
              className="w-full rounded-2xl border border-neutral-200 bg-white/80 px-6 py-4 pl-14 text-sm outline-none backdrop-blur-md transition-all duration-300 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-white dark:focus:border-fuchsia-900 dark:focus:ring-fuchsia-900/20"
            />
            <div className="absolute left-5 text-neutral-400 group-focus-within:text-fuchsia-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="absolute right-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors"
                title="Temizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Smart Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 z-[100] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Önerilen Yazılar</p>
              {suggestions.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex items-center gap-4 rounded-xl p-3 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/30 transition-colors group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 group-hover:bg-white dark:bg-neutral-800 dark:group-hover:bg-neutral-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15.651a1.5 1.5 0 0 1-3 0V3H7v16.5a2.5 2.5 0 0 0 2.5 2.5H14"/><path d="M18 14h3"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-fuchsia-600 transition-colors leading-tight">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-neutral-500">{post.category}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="bg-neutral-50 p-2 text-center dark:bg-neutral-800/50">
               <p className="text-[10px] text-neutral-400">Aradığınızı bulamadıysanız daha spesifik kelimeler deneyin.</p>
            </div>
          </div>
        )}
      </div>

      {/* Blog Grid with Animation */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredPosts.map((post, idx) => (
          <article
            key={post.id}
            className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-xl hover:shadow-fuchsia-100/50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-fuchsia-900 dark:hover:shadow-none animate-fade-up"
            style={{ animationDelay: `${(idx % 6) * 100}ms` }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-500">
              {post.category}
            </p>
            <Link href={`/blog/${post.id}`}>
              <h2 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 leading-tight">
                {post.title}
              </h2>
            </Link>
            <p className="mb-6 text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="mt-auto w-max rounded-full bg-neutral-100 px-4 py-2 text-[11px] font-bold text-neutral-700 transition-all group-hover:bg-fuchsia-50 group-hover:text-fuchsia-700 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-fuchsia-900 dark:group-hover:text-fuchsia-100"
            >
              Yazıyı Oku <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
            </Link>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full py-20 text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Sonuç bulunamadı</h3>
            <p className="text-sm text-neutral-500 mt-1">"{query}" araması ile eşleşen bir yazı yok.</p>
            <button 
              onClick={() => setQuery("")}
              className="mt-6 text-sm font-bold text-fuchsia-600 hover:underline"
            >
              Aramayı sıfırla
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
