import Link from "next/link";

export default function AdminDashboardPlaceholder() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-400">
          ROBOTIKAI • Admin Paneli
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Kontrol Paneli
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Site ayarları, eğitimler, ürünler, blog yazıları ve siparişleri
          buradan yönetebilirsin.
        </p>
      </header>

      <section className="grid gap-4 text-sm md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            İçerik & Ayarlar
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            Ana sayfa, hakkında, site ayarları ve iletişim.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/admin/content"
              className="rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white dark:bg-sky-600"
            >
              Ana Sayfa & Hakkında
            </Link>
            <Link
              href="/admin/settings"
              className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-300"
            >
              Site Ayarları
            </Link>
            <Link
              href="/admin/news"
              className="rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-semibold text-white dark:bg-indigo-600"
            >
              Haberler
            </Link>
            <Link
              href="/admin/announcements"
              className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-white dark:bg-amber-600"
            >
              Duyurular
            </Link>
            <Link
              href="/admin/partners"
              className="rounded-full bg-fuchsia-500 px-3 py-1 text-[11px] font-semibold text-white dark:bg-fuchsia-600"
            >
              Sponsorlar
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Mesajlar
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            İletişim formundan gelen mesajları görüntüle.
          </p>
          <Link
            href="/admin/messages"
            className="mt-3 inline-flex rounded-full bg-violet-500 px-3 py-1 text-[11px] font-semibold text-white dark:bg-violet-600"
          >
            Mesajlara Git
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            SSS
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            Sıkça sorulan soruları buradan yönet.
          </p>
          <Link
            href="/admin/faq"
            className="mt-3 inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            SSS Yönetimi
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Eğitimler & Blog
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            Eğitim listeleri ve blog yazıları için içerikleri buradan
            güncelle.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/admin/courses"
              className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              Eğitimler
            </Link>
            <Link
              href="/admin/blog-posts"
              className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Blog Yazıları
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Siparişler
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            Gelen siparişleri buradan takip et.
          </p>
          <Link
            href="/admin/orders"
            className="mt-3 inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            Siparişlere Git
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Ürünler
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">
            Arduino kitleri ve robotik bileşenler için ürün listesini buradan
            düzenle.
          </p>
          <Link
            href="/admin/products"
            className="mt-3 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-emerald-400 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Ürün Yönetimine Git
          </Link>
        </div>
      </section>
    </div>
  );
}

