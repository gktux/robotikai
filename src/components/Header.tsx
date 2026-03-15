"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CartLink } from "@/components/CartLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header({ cms, locale }: { cms: any, locale: "tr" | "en" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/courses", label: "Eğitimler" },
    { href: "/shop", label: "Ürünler" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Hakkında" },
    { href: "/contact", label: "İletişim" },
    { href: "/faq", label: "SSS" },
  ];

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 md:pt-5 transition-transform duration-500 group/header">
      {/* Visual Decoration for the empty area around header */}
      <div className="cyber-grid-container hidden md:block">
        <div className="cyber-mist" />
        <div className="cyber-grid" />
        <div className="circuit-line circuit-line-1" />
        <div className="circuit-line circuit-line-2" />
        <div className="circuit-line circuit-line-3" />
        <div className="circuit-line circuit-line-4" />
      </div>

      <header 
        className={`mx-auto max-w-6xl rounded-2xl md:rounded-full border transition-all duration-500 ease-out backdrop-blur-3xl ${
          scrolled 
            ? "header-glass-vibrant border-cyan-500/30 shadow-[0_12px_40px_rgba(20,184,166,0.15)] md:py-0 scale-[0.98]" 
            : "header-glass-vibrant border-glow-vibrant md:py-1.5"
        } ${mobileMenuOpen ? "bg-white dark:bg-slate-950" : ""}`}
      >
        <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-3 text-neutral-900 dark:text-neutral-100 font-medium">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="group flex items-center gap-2 md:gap-3.5 transition-all duration-500 relative z-[60] min-w-0">
            {/* Legendary Animated Branding - Full Logo */}
            <div className="relative flex h-8 md:h-10 shrink-0 items-center justify-center logo-container">
              {/* AI Energy Field behind logo */}
              <div className="logo-energy-field" />
              
              <div className="relative h-full logo-shimmer logo-3d flex items-center justify-center">
                <div className="logo-scanline" />
                <img 
                  src="/Logo.png" 
                  alt="RobotikAI Logo" 
                  className="h-full w-auto object-contain dark:hidden transition-transform duration-500" 
                />
                <img 
                  src="/Logo (Beyaz).png" 
                  alt="RobotikAI Logo" 
                  className="h-full w-auto object-contain hidden dark:block transition-transform duration-500" 
                />
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1 md:gap-2 group/nav shrink-0">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/courses" className="rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">Eğitimler</Link>
              <Link href="/shop" className="rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">Ürünler</Link>
              <Link href="/blog" className="rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">Blog</Link>
              <Link href="/about" className="hidden lg:inline-block rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">Hakkında</Link>
              <Link href="/contact" className="hidden lg:inline-block rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">İletişim</Link>
              <Link href="/faq" className="hidden lg:inline-block rounded-full px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-all hover:bg-cyan-500/5 dark:hover:bg-cyan-400/10 hover:text-teal-600 dark:hover:text-cyan-400">SSS</Link>
            </div>

            <div className="mx-1 hidden h-4 w-px bg-neutral-500/20 md:block"></div>

            <div className="flex items-center gap-1 md:gap-2 relative z-[60]">
              <div className="hidden sm:block">
                <LanguageSwitcher currentLocale={locale} />
              </div>
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <CartLink />
              <Link
                href="/admin/login"
                className="hidden md:flex items-center justify-center rounded-full border border-cyan-500/40 bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_15px_rgba(20,184,166,0.3)] transition-all hover:scale-105 hover:shadow-[0_8px_25px_rgba(20,184,166,0.4)]"
              >
                Admin
              </Link>
              
              {/* Hamburger Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "max-h-[600px] opacity-100 py-4 px-2" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1 p-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 rounded-2xl text-[15px] font-bold text-neutral-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 dark:text-slate-300 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 dark:hover:border-indigo-900/50"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-4 flex items-center justify-between px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-slate-900/50 border border-neutral-100 dark:border-slate-800">
              <span className="text-sm font-semibold text-neutral-500 dark:text-slate-400">Görünüm ve Dil</span>
              <div className="flex items-center gap-3">
                <LanguageSwitcher currentLocale={locale} />
                <div className="w-px h-4 bg-neutral-200 dark:bg-slate-700"></div>
                <ThemeToggle />
              </div>
            </div>

            <Link 
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block px-6 py-4 rounded-2xl bg-indigo-50 text-[15px] font-bold text-indigo-700 hover:bg-indigo-100 transition-all text-center dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
            >
              Yönetici Paneli (Admin)
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
