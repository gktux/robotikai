"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CartLink } from "@/components/CartLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header({ cms, locale }: { cms: any, locale: "tr" | "en" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 md:pt-5 transition-transform duration-500 group/header">
      <header 
        className={`mx-auto max-w-6xl rounded-2xl md:rounded-full border transition-all duration-300 ease-out backdrop-blur-2xl ${
          scrolled 
            ? "border-white/40 bg-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:py-0 scale-[0.98] group-hover/header:scale-100 group-hover/header:bg-white/80 group-hover/header:border-white/80 group-hover/header:shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
            : "border-white/60 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:py-0.5"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 text-neutral-800">
          <Link href="/" className="group flex items-center gap-3.5 transition-all duration-500">
          {/* 3D Animated Isometric Logo */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            {/* Glowing Aura behind logo */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 blur-[10px] transition-all duration-500 group-hover:opacity-60 group-hover:blur-xl group-hover:scale-125 ${scrolled ? 'opacity-10 group-hover/header:opacity-30' : 'opacity-20'}`} />
            
            <svg viewBox="0 0 40 40" className="relative h-full w-full drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-[-10deg]">
              <defs>
                <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" /> {/* indigo-500 */}
                  <stop offset="100%" stopColor="#8b5cf6" /> {/* violet-500 */}
                </linearGradient>
                <linearGradient id="logo-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d946ef" /> {/* fuchsia-500 */}
                  <stop offset="100%" stopColor="#8b5cf6" /> {/* violet-500 */}
                </linearGradient>
              </defs>
              
              {/* Left Crystal Wing */}
              <path 
                d="M20 5 L8 11 L8 29 L20 35 L20 20 Z" 
                fill="url(#logo-grad-1)" 
                className="transition-all duration-700 ease-in-out group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]" 
              />
              
              {/* Right Crystal Wing */}
              <path 
                d="M20 5 L32 11 L32 29 L20 35 L20 20 Z" 
                fill="url(#logo-grad-2)" 
                opacity="0.85" 
                className="transition-all duration-700 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[1px]" 
              />
              
              {/* Glowing AI Core (Center Diamond) */}
              <path 
                d="M20 15 L26 12 L20 9 L14 12 Z" 
                fill="#ffffff" 
                className="animate-pulse opacity-90 transition-all duration-700 group-hover:scale-110 origin-center" 
              />
              
              {/* Isometric Center Crease */}
              <line 
                x1="20" y1="15" x2="20" y2="34" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                className="opacity-60" 
              />
            </svg>
          </div>

          <div className="flex flex-col pt-0.5">
            <span className={`text-[13px] font-black uppercase tracking-[0.25em] bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-fuchsia-600 transition-all duration-300 delay-75`}>
              {cms.site.brandName}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500 group-hover:text-fuchsia-500 transition-colors duration-300 delay-100 ${scrolled ? 'group-hover/header:text-neutral-500 text-neutral-400' : ''}`}>
              {cms.site.tagline}
            </span>
          </div>
        </Link>

          <nav className="flex items-center gap-1.5 text-xs font-semibold md:gap-2 object-contain group/nav">
            <Link
              href="/courses"
              className="rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 hidden sm:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              Eğitimler
            </Link>
            <Link
              href="/shop"
              className="rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 hidden sm:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              Ürünler
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 hidden sm:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="hidden rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 lg:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              Hakkında
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 lg:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              İletişim
            </Link>
            <Link
              href="/faq"
              className="hidden rounded-full px-3 py-2 text-neutral-600 transition-all hover:bg-neutral-100/80 hover:text-indigo-600 lg:inline-block group-hover/nav:opacity-40 hover:!opacity-100"
            >
              SSS
            </Link>

            <div className="mx-1 hidden h-4 w-px bg-neutral-300 md:block opacity-50 transition-all duration-300 group-hover/nav:opacity-20"></div>

            <div className="flex items-center gap-2 pl-1 transition-all duration-300 group-hover/nav:opacity-40 hover:!opacity-100">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeToggle />
              <CartLink />
              <Link
                href="/admin/login"
                className="hidden md:flex items-center justify-center rounded-full border border-neutral-200 bg-white/50 px-4 py-1.5 text-[11px] font-bold text-neutral-600 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
              >
                Admin
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
