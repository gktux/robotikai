import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { readCmsWithLocale, getLocale } from "@/lib/cms";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROBOTIKAI",
};

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
            <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-200/30 blur-[100px] animate-pulse-slow mix-blend-multiply dark:bg-indigo-900/20 dark:mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-fuchsia-200/30 blur-[120px] animate-pulse-slow delay-300 mix-blend-multiply dark:bg-fuchsia-900/20 dark:mix-blend-screen" />
            <div className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-violet-200/20 blur-[120px] animate-pulse-slow delay-500 mix-blend-multiply dark:bg-violet-900/20 dark:mix-blend-screen" />
          </div>

          <div className="flex min-h-screen flex-col relative z-0">
            <CartProvider>
              <Header cms={cms} locale={locale} />

              {/* Sayfa içeriği */}
              <main className="flex-1 mt-6 md:mt-10">{children}</main>
            </CartProvider>

            {/* Alt bilgi */}
            <footer className="border-t border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-neutral-950/90">
              <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between dark:text-slate-400">
                <p>
                  {cms.site.footerLine2}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/faq" className="text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                    {cms.faq.title.split(" ").map((w: string) => w[0]).join("")} {/* SSS / FAQ */}
                  </Link>
                  <span className="text-slate-400 dark:text-slate-600">|</span>
                  <span className="text-slate-600 dark:text-slate-400">{cms.site.footerLine1}</span>
                  <span className="text-slate-400 dark:text-slate-500">{cms.site.footerLine2}</span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
