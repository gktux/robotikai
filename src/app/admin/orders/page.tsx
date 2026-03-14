import Link from "next/link";
import { getOrders, updateOrderStatus, deleteOrder } from "@/lib/orders";
import { revalidatePath } from "next/cache";

const STATUS_LABELS: Record<string, string> = {
  beklemede: "Beklemede",
  odeme_alindi: "Ödeme Alındı",
  kargoda: "Kargoda",
  tamamlandi: "Tamamlandı",
};

async function updateStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}

async function removeOrder(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  deleteOrder(id);
  revalidatePath("/admin/orders");
}

export default function AdminOrdersPage({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const filter = searchParams?.filter ?? "tumu";
  const allOrders = getOrders();

  const filtered =
    filter === "bekleyen"
      ? allOrders.filter((o) => o.status === "beklemede")
      : filter === "odeme_alindi"
        ? allOrders.filter((o) => o.status === "odeme_alindi")
        : filter === "kargoda"
          ? allOrders.filter((o) => o.status === "kargoda")
          : filter === "tamamlanan"
            ? allOrders.filter((o) => o.status === "tamamlandi")
            : filter === "onaylanan"
              ? allOrders.filter(
                  (o) =>
                    o.status === "odeme_alindi" ||
                    o.status === "kargoda" ||
                    o.status === "tamamlandi"
                )
              : allOrders;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Siparişler
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Sipariş Listesi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Siparişleri filtrele, durum güncelle veya sil.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition shadow-sm ${
            filter === "tumu"
              ? "bg-sky-500 text-white dark:bg-sky-600"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800/50"
          }`}
        >
          Tümü ({allOrders.length})
        </Link>
        <Link
          href="/admin/orders?filter=bekleyen"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition shadow-sm ${
            filter === "bekleyen"
              ? "bg-amber-500 text-white dark:bg-amber-600"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800/50"
          }`}
        >
          Bekleyenler ({allOrders.filter((o) => o.status === "beklemede").length})
        </Link>
        <Link
          href="/admin/orders?filter=odeme_alindi"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition shadow-sm ${
            filter === "odeme_alindi"
              ? "bg-sky-500 text-white dark:bg-sky-600"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800/50"
          }`}
        >
          Ödeme Alındı ({allOrders.filter((o) => o.status === "odeme_alindi").length})
        </Link>
        <Link
          href="/admin/orders?filter=kargoda"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition shadow-sm ${
            filter === "kargoda"
              ? "bg-indigo-500 text-white dark:bg-indigo-600"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800/50"
          }`}
        >
          Kargoda ({allOrders.filter((o) => o.status === "kargoda").length})
        </Link>
        <Link
          href="/admin/orders?filter=tamamlanan"
          className={`rounded-full px-4 py-2 text-xs font-semibold transition shadow-sm ${
            filter === "tamamlanan"
              ? "bg-emerald-500 text-white dark:bg-emerald-600"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:bg-slate-800/50"
          }`}
        >
          Tamamlanan ({allOrders.filter((o) => o.status === "tamamlandi").length})
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:shadow-none">
          Bu filtrede kayıtlı sipariş bulunmuyor.
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row gap-6 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none"
            >
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-800 dark:text-slate-100">
                    #ORD-{order.id.toString().padStart(4, "0")}
                  </span>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                      order.status === "beklemede"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : order.status === "tamamlandi"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                    }`}
                  >
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium ml-auto dark:text-slate-400">
                    {new Date(order.date).toLocaleString("tr-TR")}
                  </span>
                </div>
                
                <div className="grid gap-2 text-[13px] text-slate-700 md:grid-cols-2 bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
                  <p>
                    <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-0.5 dark:text-slate-400">Müşteri</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{order.customer.name}</span>
                  </p>
                  <p>
                    <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-0.5 dark:text-slate-400">E-posta</span>
                    {order.customer.email}
                  </p>
                  <p>
                    <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-0.5 dark:text-slate-400">Telefon</span>
                    {order.customer.phone}
                  </p>
                  <p>
                    <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-0.5 dark:text-slate-400">Adres</span>
                    {order.customer.address || "—"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 dark:text-slate-200">Sipariş İçeriği</h4>
                  <ul className="space-y-2 rounded-xl bg-white border border-slate-100 p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                    {order.items.map((item: any) => (
                      <li key={item.id} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0 last:pb-0 dark:border-slate-800">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.quantity}x <span className="text-slate-900 dark:text-slate-100">{item.name}</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ₺{Number(item.price * item.quantity).toLocaleString("tr-TR")}
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between items-center pt-2 font-bold text-slate-900 dark:text-slate-100">
                      <span>Toplam</span>
                      <span className="text-lg text-indigo-600 dark:text-indigo-400">
                        ₺{Number(order.total || 0).toLocaleString("tr-TR")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider dark:text-slate-200">İşlemler</h4>
                
                <form action={updateStatus} className="flex flex-col gap-2 bg-sky-50/50 p-3 rounded-xl border border-sky-100 dark:border-sky-900/30 dark:bg-sky-900/10">
                  <label className="text-[11px] font-semibold text-sky-800 dark:text-sky-300">Durum Güncelle</label>
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all w-full dark:border-sky-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:ring-sky-900/50"
                  >
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-sky-500 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-500"
                  >
                    Kaydet
                  </button>
                </form>

                <form action={removeOrder} className="mt-auto">
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-red-50 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 hover:text-red-700 border border-red-100 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300"
                  >
                    Siparişi Sil
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
