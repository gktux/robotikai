import Link from "next/link";
import { getOrders, updateOrderStatus, deleteOrder } from "@/lib/orders";
import { revalidatePath } from "next/cache";
import { OrderListClient } from "@/components/admin/OrderListClient";

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

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "tumu" } = await searchParams;
  const allOrders = getOrders();

  const isPending = (s: string) => s === "beklemede" || s === "pending";

  const filtered =
    filter === "bekleyen"
      ? allOrders.filter((o) => isPending(o.status))
      : filter === "odeme_alindi"
        ? allOrders.filter((o) => o.status === "odeme_alindi")
        : filter === "kargoda"
          ? allOrders.filter((o) => o.status === "kargoda")
          : filter === "tamamlanan"
            ? allOrders.filter((o) => o.status === "tamamlandi")
            : filter === "onaylanan"
              ? allOrders.filter(
                  (o) =>
                    isPending(o.status) ||
                    o.status === "odeme_alindi" ||
                    o.status === "kargoda" ||
                    o.status === "tamamlandi"
                )
              : allOrders;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 animate-fade-in relative">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Sipariş Yönetimi
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Siparişler & Yazdırma
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Siparişleri seçin, toplu yazdırın veya durumlarını güncelleyin.
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
          Bekleyenler ({allOrders.filter((o) => o.status === "beklemede" || o.status === "pending").length})
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
        <OrderListClient 
          orders={filtered} 
          updateStatusAction={updateStatus} 
          deleteOrderAction={removeOrder} 
          statusLabels={STATUS_LABELS}
        />
      )}
    </div>
  );
}
