import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import Link from "next/link";

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
}

export default async function AdminPartnersPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-600 dark:text-fuchsia-400">
          ROBOTIKAI • Sponsorlar
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl dark:text-slate-100">
          Sponsor Yönetimi
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Anasayfada sergilenen çözüm ortaklarını ve sponsorları buradan yönetebilirsin.
        </p>
      </header>

      <section className="mb-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Mevcut Sponsorlar
        </h2>
        <div className="space-y-3">
          {(cms.partners?.items || []).map((item: any) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 md:grid-cols-[1.2fr,1.5fr,1.3fr,auto] dark:border-slate-800 dark:bg-slate-800/50"
            >
              <form action={updatePartner} className="contents">
                <input type="hidden" name="id" value={item.id} />
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Kurum Adı</label>
                  <input
                    name="name"
                    defaultValue={item.name}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Logo URL</label>
                  <input
                    name="logo"
                    defaultValue={item.logo}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="https://... veya /uploads/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-600 dark:text-slate-400">Web Sitesi</label>
                  <input
                    name="link"
                    defaultValue={item.link}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="h-[32px] rounded-lg bg-fuchsia-500 px-3 text-xs font-bold text-white transition hover:bg-fuchsia-400"
                  >
                    💾
                  </button>
                </div>
              </form>
              <form action={deletePartner} className="flex items-end">
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="h-[32px] rounded-lg bg-red-100 px-3 text-xs font-bold text-red-600 transition hover:bg-red-200"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
          {(cms.partners?.items || []).length === 0 && (
            <p className="py-4 text-center text-xs text-slate-500 italic">Henüz sponsor eklenmemiş.</p>
          )}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm shadow-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Yeni Sponsor Ekle</h2>
        <form action={addPartner} className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Kurum Adı</label>
            <input
              name="name"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Google, Microsoft vb."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Logo URL</label>
            <input
              name="logo"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-700 dark:text-slate-400">Web Sitesi</label>
            <input
              name="link"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            className="md:col-span-3 rounded-full bg-fuchsia-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-fuchsia-500"
          >
            Sponsor Ekle
          </button>
        </form>
      </section>
    </div>
  );
}
