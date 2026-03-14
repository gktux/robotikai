import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";

async function addAnnouncement(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString().trim() ?? "";
  const isImportant = formData.get("isImportant") === "on";

  if (!title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.announcements?.items || []) as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    announcements: {
      ...current.announcements,
      items: [
        ...items,
        {
          id: maxId + 1,
          title,
          content,
          date: date || new Date().toLocaleDateString("tr-TR"),
          isImportant,
        },
      ],
    },
  }, locale);
}

async function deleteAnnouncement(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.announcements?.items || []) as any[];
  
  writeCms({
    announcements: {
      ...current.announcements,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
}

export default async function AdminAnnouncementsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Duyurular
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Duyuru Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Önemli duyuruları buradan ekleyebilirsin.
        </p>
      </header>

      <section className="mb-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Mevcut Duyurular
        </h2>
        <div className="space-y-4">
          {(cms.announcements?.items || []).map((item: any) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${item.isImportant ? 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="text-[10px] text-slate-500">{item.date}</p>
                </div>
                <form action={deleteAnnouncement}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="text-red-500 hover:text-red-700 text-xs font-bold">Sil</button>
                </form>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Yeni Duyuru Ekle</h2>
        <form action={addAnnouncement} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Başlık</label>
            <input name="title" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">İçerik</label>
            <textarea name="content" rows={3} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-700 dark:text-slate-400">Tarih</label>
              <input name="date" defaultValue={new Date().toLocaleDateString("tr-TR")} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" name="isImportant" id="isImportant" className="w-4 h-4 rounded border-slate-300" />
              <label htmlFor="isImportant" className="text-xs text-slate-700 dark:text-slate-400">Önemli Duyuru</label>
            </div>
          </div>
          <button type="submit" className="w-full rounded-full bg-sky-500 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-sky-400">
            Duyuru Ekle
          </button>
        </form>
      </section>
    </div>
  );
}
