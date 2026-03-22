import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { AnnouncementManager } from "@/components/admin/AnnouncementManager";
import { AnnouncementHeadersForm, AnnouncementAddForm } from "@/components/admin/AnnouncementForms";

async function updateSection(formData: FormData) {
  "use server";
  const locale = await getLocale();
  writeCms({
    announcements: {
      badge: formData.get("badge")?.toString() ?? "",
      title: formData.get("title")?.toString() ?? "",
      intro: formData.get("intro")?.toString() ?? "",
    } as any
  }, locale);
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

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
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

async function updateAnnouncementItem(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString().trim() ?? "";
  const isImportant = formData.get("isImportant") === "on";

  if (!id || !title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.announcements?.items || []) as any[];
  const updatedItems = items.map(item => 
    item.id === id 
      ? { ...item, title, content, date, isImportant } 
      : item
  );

  writeCms({
    announcements: {
      ...current.announcements,
      items: updatedItems,
    },
  }, locale);
  revalidatePath("/admin/announcements");
  revalidatePath("/");
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
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export default async function AdminAnnouncementsPage() {
  const cms = await readCmsWithLocale();
  const announcements = cms.announcements || { items: [] };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
          ROBOTIKAI • Duyurular
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Duyuru Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Ana sayfa duyuru bölümü başlıklarını ve duyuru listesini buradan yönet.
        </p>
      </header>

      {/* Bölüm Ayarları */}
      <section className="mb-10 space-y-4 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-3 mb-4">
           <div className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
           </div>
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Bölüm Başlıkları (Ana Sayfa)
           </h2>
        </div>
        
        <AnnouncementHeadersForm initialData={announcements} updateAction={updateSection} />
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        {/* Sol: Liste Aracı */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500"></span>
              Mevcut Duyurular
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{announcements.items?.length || 0} Adet</span>
          </div>
          <AnnouncementManager 
            items={announcements.items || []} 
            updateAction={updateAnnouncementItem} 
            deleteAction={deleteAnnouncement}
          />
        </section>

        {/* Sağ: Yeni Ekle */}
        <section className="space-y-6">
          <div className="sticky top-24 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
            <div className="mb-6">
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Yeni Duyuru</h2>
              <p className="text-xs text-slate-500 font-medium">Hızlıca yeni bir duyuru yayınla.</p>
            </div>
            
            <AnnouncementAddForm addAction={addAnnouncement} />
          </div>
        </section>
      </div>
    </div>
  );
}
