"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const CART_KEY = "robotikai_cart";

type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
};

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("robotikai_cart_update"));
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";

    if (!email?.trim()) {
      setError("E-posta adresi gerekli.");
      setLoading(false);
      return;
    }

    const cart = getCart();
    if (cart.length === 0) {
      setError("Sepetiniz boş.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          name,
          email,
          phone,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = `/checkout/success?id=${data.orderId}`;
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-sm text-slate-500">Yükleniyor…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="mb-4 text-slate-600">Sepetiniz boş.</p>
        <Link
          href="/shop"
          className="inline-block rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Ürünlere Git
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14 animate-fade-in">
      <header className="mb-8 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          ROBOTIKAI • Checkout
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Ödeme
        </h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Teslimat Bilgileri
            </h2>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700">Ad Soyad</label>
              <input
                name="name"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700">E-posta *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                placeholder="ornek@email.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700">Telefon</label>
              <input
                name="phone"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700">Adres</label>
              <textarea
                name="address"
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
                placeholder="Teslimat adresi"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Sipariş Özeti
              </h2>
              <ul className="space-y-2 text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between text-slate-600">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-emerald-600">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-70"
            >
              {loading ? "İşleniyor…" : "Siparişi Tamamla"}
            </button>

            <Link
              href="/cart"
              className="block text-center text-sm text-slate-600 underline hover:text-sky-600"
            >
              Sepete Dön
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
