"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  level: string;
  duration: string;
  highlight: string;
  image?: string;
}

interface CourseSearchProps {
  courses: Course[];
}

export function CourseSearch({ courses }: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Suggestions logic: top 3-4 matches based on title
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return courses
      .filter(c => c.title.toLowerCase().includes(lowerQuery))
      .slice(0, 4);
  }, [query, courses]);

  // Actual filtered courses for the grid
  const filteredCourses = useMemo(() => {
    if (!query.trim()) return courses;
    const lowerQuery = query.toLowerCase();
    return courses.filter(
      c => 
        c.title.toLowerCase().includes(lowerQuery) || 
        c.level.toLowerCase().includes(lowerQuery) ||
        c.highlight.toLowerCase().includes(lowerQuery)
    );
  }, [query, courses]);

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
          <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Eğitim ara (Başlık, seviye veya içerik...)"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 100) setQuery(val); // Limit search length
              }}
              onFocus={() => setIsFocused(true)}
              className="w-full rounded-2xl border border-neutral-200 bg-white/80 px-6 py-4 pl-14 text-sm outline-none backdrop-blur-md transition-all duration-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-white dark:focus:border-indigo-900 dark:focus:ring-indigo-900/20"
            />
            <div className="absolute left-5 text-neutral-400 group-focus-within:text-indigo-500 transition-colors">
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
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Önerilen Eğitimler</p>
              {suggestions.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="flex items-center gap-4 rounded-xl p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 group-hover:bg-white dark:bg-neutral-800 dark:group-hover:bg-neutral-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-tight">
                      {course.title}
                    </p>
                    <p className="text-[11px] text-neutral-500">{course.level} Seviye</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="bg-neutral-50 p-2 text-center dark:bg-neutral-800/50">
               <p className="text-[10px] text-neutral-400">Aradığınız programı bulamadıysanız bize ulaşabilirsiniz.</p>
            </div>
          </div>
        )}
      </div>

      {/* Course Grid with Animation */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredCourses.map((course, idx) => (
          <article
            key={course.id}
            className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-900 dark:hover:shadow-none animate-fade-up"
            style={{ animationDelay: `${(idx % 6) * 100}ms` }}
          >
            <div className="mb-4 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-bold uppercase tracking-wider text-indigo-500">{course.level} SEVİYE</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {course.duration}
              </span>
            </div>
            <Link href={`/courses/${course.id}`}>
              <h2 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 leading-tight">
                {course.title}
              </h2>
            </Link>
            <p className="mb-6 text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
              {course.highlight}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>Hemen Başla</span>
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="rounded-full bg-neutral-100 px-4 py-2 text-[11px] font-bold text-neutral-700 transition-all group-hover:bg-indigo-500 group-hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-indigo-600"
              >
                İncele <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-20 text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Eğitim bulunamadı</h3>
            <p className="text-sm text-neutral-500 mt-1">"{query}" araması ile eşleşen bir program yok.</p>
            <button 
              onClick={() => setQuery("")}
              className="mt-6 text-sm font-bold text-indigo-600 hover:underline"
            >
              Aramayı sıfırla
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
