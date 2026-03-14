import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "contact-messages.json");

function getMessages() {
  try {
    const raw = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function AdminMessagesPage() {
  const messages = getMessages();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Mesajlar
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          İletişim Formu Mesajları
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          İletişim sayfasından gelen mesajlar burada listelenir.
        </p>
      </header>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
          Henüz mesaj yok.
        </div>
      ) : (
        <div className="space-y-4">
          {messages
            .slice()
            .reverse()
            .map((m: { id: number; name: string; email: string; message: string; createdAt: string }) => (
              <div
                key={m.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className="mb-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{m.name || "—"}</span>
                  <span>{new Date(m.createdAt).toLocaleString("tr-TR")}</span>
                </div>
                <p className="font-medium text-sky-700 dark:text-sky-400">{m.email}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{m.message}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
