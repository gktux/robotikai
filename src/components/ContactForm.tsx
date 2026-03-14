"use client";

import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        setLoading(false);
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Bağlantı hatası.");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="font-semibold text-emerald-800">Mesajınız alındı.</p>
        <p className="mt-1 text-sm text-emerald-600">
          En kısa sürede size dönüş yapacağız.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs text-slate-700" htmlFor="name">
          Ad Soyad
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
          placeholder="Adınız"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-slate-700" htmlFor="email">
          E-posta *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
          placeholder="ornek@email.com"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-slate-700" htmlFor="message">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40"
          placeholder="Kısaca yazın."
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-sky-400 disabled:opacity-70"
      >
        {loading ? "Gönderiliyor…" : "Mesajı Gönder"}
      </button>
    </form>
  );
}
