"use client";

import { useState } from "react";

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: any[];
}

export function OrderListClient({ 
  orders, 
  updateStatusAction, 
  deleteOrderAction,
  statusLabels 
}: { 
  orders: Order[];
  updateStatusAction: (fd: FormData) => Promise<void>;
  deleteOrderAction: (fd: FormData) => Promise<void>;
  statusLabels: Record<string, string>;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [printModelOpen, setPrintModalOpen] = useState(false);
  const [printFormat, setPrintFormat] = useState<"a4" | "label_100x150" | "label_40x80" | "roll_80">("a4");

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === orders.length && orders.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map(o => o.id));
    }
  };

  const parsePrice = (price: any) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      // ₺ sembolünü ve boşlukları temizle. TR formatında nokta binlik, virgül ondalıktır.
      const sanitized = price.replace(/[₺ ]/g, "").replace(/\./g, "").replace(",", ".");
      const num = parseFloat(sanitized);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const handlePrint = () => {
    if (selectedIds.length === 0) {
      alert("Lütfen önce en az bir sipariş seçin.");
      return;
    }
    setPrintModalOpen(true);
  };

  const executePrint = () => {
    setTimeout(() => {
      window.print();
      setPrintModalOpen(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* List Header with Bulk Actions */}
      <div className="sticky top-20 z-10 -mx-4 mb-6 bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-slate-900/80 border-y border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-slate-300 text-sky-500"
              checked={selectedIds.length === orders.length && orders.length > 0}
              onChange={toggleAll}
            />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Tümünü Seç</span>
          </label>
          
          <div className={`flex items-center gap-2 transition-all duration-300 ${selectedIds.length > 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
            <span className="text-xs font-medium text-slate-400">|</span>
            <span className="text-xs font-bold text-sky-600">{selectedIds.length} Seçildi</span>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Yazdır
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`group relative rounded-2xl border transition-all duration-300 ${
              selectedIds.includes(order.id) 
                ? "border-sky-500 bg-sky-50/30 dark:border-sky-500/50 dark:bg-sky-500/5" 
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80"
            } p-6 shadow-sm flex flex-col md:flex-row gap-6 dark:shadow-none`}
          >
            <div className="absolute top-6 left-6 md:-left-10 md:top-1/2 md:-translate-y-1/2">
              <input 
                type="checkbox" 
                checked={selectedIds.includes(order.id)}
                onChange={() => toggleSelect(order.id)}
                className="h-5 w-5 rounded-md border-slate-300 text-sky-500 cursor-pointer transition-transform active:scale-90"
              />
            </div>

            <div className="flex-1 md:pl-4">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-800 dark:text-slate-100">
                  #ORD-{order.id.toString().padStart(4, "0")}
                </span>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                    order.status === "beklemede" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                    order.status === "tamamlandi" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                    "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                }`}>
                  {statusLabels[order.status] ?? order.status}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-auto dark:text-slate-400">
                  {new Date(order.date).toLocaleString("tr-TR")}
                </span>
              </div>
              
              <div className="grid gap-2 text-[13px] text-slate-700 md:grid-cols-2 bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
                <p><span className="text-slate-500 font-medium block text-[11px] uppercase mb-0.5">Müşteri</span><span className="font-semibold text-slate-900 dark:text-slate-100">{order.customer.name}</span></p>
                <p><span className="text-slate-500 font-medium block text-[11px] uppercase mb-0.5">Telefon</span>{order.customer.phone}</p>
                <p className="md:col-span-2 border-t border-slate-200 dark:border-slate-700 pt-2 mt-1">
                  <span className="text-slate-500 font-medium block text-[11px] uppercase mb-0.5">Adres</span>{order.customer.address || "—"}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 dark:text-slate-200">Sipariş İçeriği</h4>
                <ul className="space-y-2 rounded-xl bg-white border border-slate-100 p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                  {order.items.map((item: any, idx) => (
                    <li key={idx} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0 last:pb-0 dark:border-slate-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{item.quantity}x {item.name}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">₺{Number(parsePrice(item.price) * item.quantity).toLocaleString("tr-TR")}</span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center pt-2 font-bold text-slate-900 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800">
                    <span>Toplam</span>
                    <span className="text-lg text-indigo-600 dark:text-indigo-400">₺{Number(order.total || 0).toLocaleString("tr-TR")}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider dark:text-slate-200">Durum</h4>
                <form action={updateStatusAction} className="flex flex-col gap-2 bg-sky-50/50 p-3 rounded-xl border border-sky-100 dark:border-sky-900/30 dark:bg-sky-900/10">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-medium dark:bg-slate-950">
                        {Object.entries(statusLabels).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                        ))}
                    </select>
                    <button type="submit" className="w-full rounded-lg bg-sky-500 py-2 text-xs font-bold text-white transition hover:bg-sky-400">Kaydet</button>
                </form>
                <form action={deleteOrderAction} className="mt-auto">
                    <input type="hidden" name="id" value={order.id} />
                    <button type="submit" className="w-full rounded-lg bg-red-50 py-2 text-xs font-bold text-red-600 border border-red-100 dark:bg-red-900/10">Siparişi Sil</button>
                </form>
            </div>
          </div>
        ))}
      </div>

      {/* Print Settings Modal */}
      {printModelOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Yazdırma Ayarları</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { id: "label_100x150", label: "100x150 mm", sub: "Kargo Etiketi" },
                  { id: "label_40x80", label: "40x80 mm", sub: "Ürün Etiketi" },
                  { id: "roll_80", label: "80 mm Roll", sub: "Termal Rulo" },
                  { id: "a4", label: "A4 Sayfa", sub: "Liste" },
                ].map((f) => (
                  <button key={f.id} onClick={() => setPrintFormat(f.id as any)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${printFormat === f.id ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-500/10" : "border-slate-100 text-slate-500"}`}>
                    <span className="text-sm font-bold">{f.label}</span>
                    <span className="text-[10px] uppercase opacity-60">{f.sub}</span>
                  </button>
                ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPrintModalOpen(false)} className="flex-1 rounded-xl border py-3 text-sm font-bold">Vazgeç</button>
              <button onClick={executePrint} className="flex-3 bg-sky-500 rounded-xl py-3 text-sm font-bold text-white shadow-lg flex items-center justify-center gap-2 px-8">Yazdır</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Content */}
      <div className="print-only-wrapper">
        <div id="printable-content" className={`print-container format-${printFormat}`}>
          {orders.filter(o => selectedIds.includes(o.id)).map(order => (
            <div key={order.id} className="print-page">
              <div className="print-header">
                <div>
                  <h2>#ORD-{order.id}</h2>
                  <p className="print-date">{new Date(order.date).toLocaleDateString("tr-TR")}</p>
                </div>
                <div className="print-brand">ROBOTIKAI</div>
              </div>

              <div className="print-body">
                <div className="print-customer">
                  <h3>Müşteri Bilgileri</h3>
                  <p><strong>Ad Soyad:</strong> {order.customer.name}</p>
                  <p><strong>Telefon:</strong> {order.customer.phone}</p>
                  <address><strong>Adres:</strong> {order.customer.address}</address>
                </div>

                <div className="print-items">
                  <h3>Sipariş İçeriği</h3>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Ürün</th>
                        <th className="text-center">Adet</th>
                        <th className="text-right">Fiyat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-right">₺{Number(parsePrice(item.price) * item.quantity).toLocaleString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="print-total">
                  <span>Genel Toplam</span>
                  <span>₺{Number(order.total || 0).toLocaleString("tr-TR")}</span>
                </div>
              </div>
              
              <div className="print-footer">
                <p>RobotikAI - Geleceği Kodluyoruz</p>
                <div className="print-barcode-placeholder">
                  ||||||||||||||||||||| ORD-{order.id} |||||||||||||||||||||
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
