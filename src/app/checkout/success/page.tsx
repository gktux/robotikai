import Link from "next/link";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: { id?: string };
}) {
  const orderId = searchParams?.id ?? "—";

  return (
    <div className="mx-auto max-w-lg px-4 py-14 text-center animate-fade-in">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
        ✓
      </div>
      <h1 className="mb-2 text-xl font-semibold text-slate-900">
        Siparişiniz Alındı
      </h1>
      <p className="mb-6 text-sm text-slate-600">
        Sipariş numaranız: <span className="font-mono font-semibold">{orderId}</span>
      </p>
      <p className="mb-8 text-xs text-slate-500">
        Ödeme başarılı. Siparişiniz işleme alındı. Admin panelinden siparişleri
        takip edebilirsiniz.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Alışverişe Devam Et
        </Link>
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
