"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";

export function AddToCartButton({
  id,
  name,
  price,
  priceValue,
  image,
}: {
  id: number;
  name: string;
  price: string;
  priceValue?: number;
  image?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Fallback if priceValue is missing on older objects
  const numericPrice = priceValue ?? (parseInt(price.replace(/[^0-9]/g, "")) || 0);

  const handleClick = () => {
    addItem({ id, name, price: numericPrice, image: image ?? "" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-4 py-2 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 ${
        added 
          ? "bg-emerald-500 shadow-none pointer-events-none" 
          : "bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-500/30"
      }`}
    >
      {added ? "Eklendi ✓" : "Sepete Ekle"}
    </button>
  );
}
