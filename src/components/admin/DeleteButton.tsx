"use client";

interface DeleteButtonProps {
  label: string;
  confirmMessage?: string;
}

export function DeleteButton({ label, confirmMessage = "Emin misiniz?" }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
      {label}
    </button>
  );
}
