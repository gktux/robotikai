import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/admin/DeleteButton";

const FILE = path.join(process.cwd(), "data", "contact-messages.json");

function getMessages() {
  try {
    if (!fs.existsSync(FILE)) return [];
    const raw = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function deleteMessage(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  try {
    const messages = getMessages();
    const filtered = messages.filter((m: any) => m.id !== id);
    fs.writeFileSync(FILE, JSON.stringify(filtered, null, 2), "utf-8");
    revalidatePath("/admin/messages");
  } catch (err) {
    console.error("Mesaj silinirken hata oluştu:", err);
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
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-sky-100 hover:shadow-lg hover:shadow-sky-500/5 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-sky-900/40"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="space-y-1">
                     <p className="text-xs font-bold uppercase tracking-wider text-slate-400">GÖNDEREN</p>
                     <p className="font-semibold text-slate-900 dark:text-slate-100">{m.name || "İsimsiz Kullanıcı"}</p>
                     <p className="text-sm text-sky-600 dark:text-sky-400">{m.email}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-[10px] font-medium text-slate-400">{new Date(m.createdAt).toLocaleString("tr-TR")}</p>
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={m.id} />
                      <DeleteButton 
                        label="Mesajı Sil" 
                        confirmMessage="Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?" 
                      />
                    </form>
                  </div>
                </div>
                
                <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">MESAJ İÇERİĞİ</p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic">
                    "{m.message}"
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

