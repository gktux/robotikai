"use client";

import { useState, useRef } from "react";
import { useAdmin } from "./AdminContext";

interface ImageUploadFieldProps {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function ImageUploadField({
  name,
  defaultValue = "",
  label = "Görsel",
  placeholder = "https://... veya dosya seçin",
  className = "",
}: ImageUploadFieldProps) {
  const { showToast } = useAdmin();
  const [url, setUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Yükleme başarısız");

      const data = await res.json();
      setUrl(data.url);
    } catch (err) {
      console.error(err);
      showToast("Dosya yüklenirken bir hata oluştu.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 font-medium pr-10"
          />
          {isUploading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-500 border-t-transparent"></div>
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {isUploading ? "Yükleniyor..." : "Gözat"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {url && (
        <div className="mt-2 relative h-20 w-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Önizleme"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
