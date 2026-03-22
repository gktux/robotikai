import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { PartnersManager } from "@/components/admin/PartnersManager";
import { PartnerAddForm } from "@/components/admin/PartnerForms";

async function addPartner(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString().trim() ?? "";
  const logo = formData.get("logo")?.toString().trim() ?? "";
  const link = formData.get("link")?.toString().trim() ?? "";

  if (!name || !logo) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.partners?.items || []) as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    partners: {
      ...current.partners,
      items: [
        ...items,
        {
          id: maxId + 1,
          name,
          logo,
          link,
        },
      ],
    },
  }, locale);
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

async function deletePartner(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.partners?.items || []) as any[];
  
  writeCms({
    partners: {
      ...current.partners,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

async function updatePartner(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const name = formData.get("name")?.toString().trim() ?? "";
  const logo = formData.get("logo")?.toString().trim() ?? "";
  const link = formData.get("link")?.toString().trim() ?? "";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = (current.partners?.items || []) as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name,
          logo,
          link,
        }
      : item
  );

  writeCms({
    partners: {
      ...current.partners,
      items: updatedItems,
    },
  }, locale);
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

export default async function AdminPartnersPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-400">
          ROBOTIKAI • Sponsorlar
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Sponsor Yönetimi
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Anasayfada sergilenen çözüm ortaklarını ve sponsorları buradan yönetebilirsin.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        {/* Sol: Mevcut Sponsorlar */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-500"></span>
              Aktif Sponsorlar
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase">{cms.partners?.items?.length || 0} Kurum</span>
          </div>
          
          <PartnersManager 
            items={cms.partners?.items || []} 
            updateAction={updatePartner} 
            deleteAction={deletePartner} 
          />
        </section>

        {/* Sağ: Yeni Ekle */}
        <section className="space-y-6">
          <div className="sticky top-24 rounded-[3rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none transition-all">
            <div className="mb-8">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Yeni Sponsor Ekle</h2>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Ağımıza Kat</p>
            </div>
            
            <PartnerAddForm addAction={addPartner} />
          </div>
        </section>
      </div>
    </div>
  );
}
