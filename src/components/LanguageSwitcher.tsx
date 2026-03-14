"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/actions";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: "tr" | "en" }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (newLocale: "tr" | "en") => {
    if (newLocale === currentLocale) return;
    
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  return (
    <div className="flex bg-neutral-100 rounded-full p-0.5">
      <button
        onClick={() => handleSwitch("tr")}
        disabled={isPending}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
          currentLocale === "tr"
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
      >
        TR
      </button>
      <button
        onClick={() => handleSwitch("en")}
        disabled={isPending}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
          currentLocale === "en"
            ? "bg-white text-indigo-600 shadow-sm"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
      >
        EN
      </button>
    </div>
  );
}
