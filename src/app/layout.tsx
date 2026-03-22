import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { readCmsWithLocale, getLocale } from "@/lib/cms";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCmsWithLocale();
  return {
    title: cms.site.brandName,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cms = await readCmsWithLocale();
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 bg-white dark:bg-neutral-950 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Global Ambient Background */}
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[5%] h-[400px] w-[400px] rounded-full bg-teal-200/10 blur-[100px] animate-pulse-slow mix-blend-multiply dark:bg-teal-900/5 dark:mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-cyan-200/15 blur-[120px] animate-pulse-slow delay-300 mix-blend-multiply dark:bg-cyan-900/10 dark:mix-blend-screen" />
            <div className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-slate-200/10 blur-[120px] animate-pulse-slow delay-500 mix-blend-multiply dark:bg-slate-900/5 dark:mix-blend-screen" />
          </div>

          <div className="flex min-h-screen flex-col relative z-0">
            <CartProvider>
              <SmoothScroll>
                <Header cms={cms} locale={locale} />

                {/* Sayfa içeriği */}
                <main className="flex-1 mt-6 md:mt-10">{children}</main>
              </SmoothScroll>
            </CartProvider>

            {/* Premium Footer */}
            <footer className="mt-20 border-t border-neutral-200/50 bg-white/50 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-950/50">
              <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                  <div className="flex flex-col items-center gap-4 md:items-start">
                    <Link href="/" className="group relative">
                      <div className="absolute -inset-4 rounded-xl bg-indigo-500/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                      <img 
                        src="/Logo.png" 
                        alt="RobotikAI" 
                        className="h-10 w-auto object-contain dark:hidden brightness-0 opacity-80 transition-all group-hover:brightness-100 group-hover:opacity-100" 
                      />
                      <img 
                        src="/Logo (Beyaz).png" 
                        alt="RobotikAI" 
                        className="hidden h-10 w-auto object-contain dark:block opacity-60 transition-all group-hover:opacity-100" 
                      />
                    </Link>
                    <p className="max-w-xs text-center text-sm text-neutral-500 md:text-left dark:text-neutral-400">
                      {cms.site.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6 md:items-end">
                    <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                      <Link href="/courses" className="hover:text-indigo-600 transition-colors">Eğitimler</Link>
                      <Link href="/shop" className="hover:text-indigo-600 transition-colors">Ürünler</Link>
                      <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
                      <Link href="/contact" className="hover:text-indigo-600 transition-colors">İletişim</Link>
                    </nav>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
                      <span>{cms.site.footerLine1}</span>
                      <span className="h-1 w-1 rounded-full bg-neutral-300" />
                      <span>{cms.site.footerLine2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
