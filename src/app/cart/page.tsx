"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { submitOrder } from "@/app/cart/actions";

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("items", JSON.stringify(items));
    formData.append("total", cartTotal.toString());

    try {
      const result = await submitOrder(formData);
      if (result.success) {
        setSuccess(true);
        clearCart();
      } else {
        setError(result.error || "Bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 animate-fade-in text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6 border-4 border-emerald-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
          Siparişiniz Alındı!
        </h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Teşekkür ederiz. Sipariş detaylarınız tarafımıza ulaşmıştır. En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <Link
          href="/shop"
          className="inline-block rounded-full bg-sky-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-sm"
        >
          Alışverişe Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-8 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          ROBOTIKAI • Sepet
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Alışveriş Sepetim
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500 mb-6">Sepetinizde ürün bulunmamaktadır.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-sm"
          >
            Ürünleri Keşfet
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 px-1">Sipariş Özeti</h2>
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-slate-100 pb-4 pt-2 last:border-0 last:pb-2"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {item.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-indigo-200">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
                    <p className="text-sm font-medium text-emerald-600 mt-1">₺{item.price.toLocaleString("tr-TR")}</p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 rounded-full p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-sky-600 hover:border-sky-200 border border-transparent"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-xs font-bold text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-sky-600 hover:border-sky-200 border border-transparent"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Ürünü Sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              ))}
              
              <div className="pt-4 mt-2 flex justify-between items-center text-lg font-bold text-slate-900 border-t border-slate-100">
                <span>Ara Toplam:</span>
                <span className="text-indigo-600">₺{cartTotal.toLocaleString("tr-TR")}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors"
              >
                ← Alışverişe Devam Et
              </Link>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 px-1 mb-4">Teslimat Bilgileri</h2>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100 font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-slate-700">Ad Soyad</label>
                <input
                  required
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                  placeholder="Ahmet Yılmaz"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-slate-700">E-posta</label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                  placeholder="ahmet@ornek.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-slate-700">Telefon</label>
                <input
                  required
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                  placeholder="05XX XXX XX XX"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="address" className="text-xs font-semibold text-slate-700">Açık Adres</label>
                <textarea
                  required
                  id="address"
                  name="address"
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all resize-none"
                />
              </div>

              {/* Legal Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    required
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500/20"
                  />
                  <span className="text-[11px] leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">
                    <a href="/legal/kvkk" target="_blank" className="font-semibold text-slate-700 underline hover:text-sky-600 transition-colors">KVKK Aydınlatma Metni</a>'ni okudum ve verilerimin işlenmesini onaylıyorum.
                  </span>
                </label>
              </div>

              <div className="mt-2 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-400 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Siparişi Tamamla"
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                  Bilgileriniz güvenle saklanmaktadır.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
