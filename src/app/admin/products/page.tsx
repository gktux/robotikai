import { readCms, writeCms, readCmsWithLocale, getLocale } from "@/lib/cms";

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString().trim() ?? "";
  const price = formData.get("price")?.toString().trim() ?? "";
  const priceValue = Number(formData.get("priceValue")) || 0;
  const image = formData.get("image")?.toString().trim() ?? "";
  const tag = formData.get("tag")?.toString().trim() ?? "";
  const info = formData.get("info")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";

  if (!name) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.shop.items as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    shop: {
      ...current.shop,
      items: [
        ...items,
        {
          id: maxId + 1,
          name,
          price,
          priceValue,
          image,
          tag,
          info,
          description,
        },
      ],
    },
  }, locale);
}

async function deleteProduct(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.shop.items as any[];
  
  writeCms({
    shop: {
      ...current.shop,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
}

async function updateProduct(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const name = formData.get("name")?.toString().trim() ?? "";
  const price = formData.get("price")?.toString().trim() ?? "";
  const priceValue = Number(formData.get("priceValue")) || 0;
  const image = formData.get("image")?.toString().trim() ?? "";
  const tag = formData.get("tag")?.toString().trim() ?? "";
  const info = formData.get("info")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.shop.items as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name,
          price,
          priceValue,
          image,
          tag,
          info,
          description,
        }
      : item
  );

  writeCms({
    shop: {
      ...current.shop,
      items: updatedItems,
    },
  }, locale);
}

export default async function AdminProductsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 animate-fade-in">
      <header className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse dark:bg-indigo-400" />
          ROBOTIKAI • Ürün Yönetimi
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-neutral-900 dark:text-slate-100">
          Mağaza Kontrol Paneli
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-neutral-600 leading-relaxed dark:text-slate-400">
          Buradan sitede görünen Arduino kitleri ve robotik bileşenleri ekleyebilir, düzenleyebilir veya silebilirsin. <span className="font-semibold text-indigo-600 dark:text-indigo-400">/shop</span> sayfası ve sıralama menüsü doğrudan bu verilerle çalışır.
        </p>
      </header>

      {/* NEW PRODUCT SECTION */}
      <section className="mb-10 animate-fade-up">
        <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/30 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-900/50 dark:hover:shadow-indigo-900/20">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="M12 5v14"/>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-slate-100">Yeni Ürün Ekle</h2>
          </div>
          
          <form action={addProduct} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 ml-1 dark:text-slate-400" htmlFor="name">
                  Ürün Adı
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Örn: Gelişmiş Arduino Seti"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-neutral-400/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 ml-1 dark:text-slate-400" htmlFor="price">
                  Görünen Fiyat
                </label>
                <input
                  id="price"
                  name="price"
                  placeholder="1.299 ₺"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-neutral-400/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-indigo-700 ml-1 dark:text-indigo-400" htmlFor="priceValue">
                  Sıralama Fiyatı (Sayı)
                </label>
                <input
                  id="priceValue"
                  name="priceValue"
                  type="number"
                  placeholder="1299"
                  className="w-full rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-2.5 text-sm font-medium text-indigo-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-indigo-300 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-indigo-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 ml-1 dark:text-slate-400" htmlFor="tag">
                  Kategori Etiketi
                </label>
                <input
                  id="tag"
                  name="tag"
                  placeholder="Örn: Proje, Başlangıç"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-neutral-400/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-1.5 lg:col-span-3">
                <label className="text-xs font-semibold text-neutral-700 ml-1 dark:text-slate-400" htmlFor="info">
                  Kısa Açıklama (Vitrin)
                </label>
                <input
                  id="info"
                  name="info"
                  placeholder="Ürün kartında görünecek 1-2 cümlelik özet bilgi."
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-neutral-400/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-fuchsia-700 ml-1 flex items-center gap-1.5 dark:text-fuchsia-400" htmlFor="image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  Görsel Linki
                </label>
                <input
                  id="image"
                  name="image"
                  placeholder="Resim URL'si yapıştırın"
                  className="w-full rounded-xl border border-fuchsia-200 bg-fuchsia-50/30 px-4 py-2.5 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-400/10 placeholder:text-fuchsia-300 dark:border-fuchsia-900/50 dark:bg-fuchsia-900/20 dark:text-fuchsia-100 dark:focus:border-fuchsia-500 dark:focus:bg-slate-900 dark:placeholder:text-fuchsia-500"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 ml-1 dark:text-slate-400" htmlFor="description">
                  Detaylı Açıklama (Opsiyonel)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Ürün detay sayfasında görünecek uzun metin. Alt satırlar otomatik korunur."
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-all outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 placeholder:text-neutral-400/70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
                />
                <p className="text-[10px] text-slate-500 italic mt-1">💡 Not: Alt satırlar otomatik algılanır.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="group relative flex w-full md:w-auto items-center justify-center gap-2 overflow-hidden rounded-xl bg-neutral-900 px-8 py-3 text-sm font-bold text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Ekle ve Yayına Al
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* EXISTING PRODUCTS LIST */}
      <section className="animate-fade-up delay-100">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-slate-100">Mevcut Ürünler</h2>
          <span className="rounded-full bg-neutral-200/60 px-3 py-1 text-xs font-bold text-neutral-600 dark:bg-slate-800 dark:text-slate-400">
            {cms.shop.items.length} Adet
          </span>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {cms.shop.items.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-[1.5rem] border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/30 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-900/50 dark:hover:shadow-indigo-900/20"
            >
              <form action={updateProduct} className="flex flex-col flex-1 gap-4" id={`update-form-${product.id}`}>
                <input type="hidden" name="id" value={product.id} />
                
                {/* Header Grid: Title & Prices */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 ml-1 dark:text-slate-500">Ürün Adı & Etiketi</label>
                    <div className="flex gap-2">
                      <input
                        name="name"
                        defaultValue={product.name}
                        className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm font-bold text-neutral-900 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                      />
                      <input
                        name="tag"
                        defaultValue={product.tag}
                        placeholder="Etiket"
                        className="w-24 rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-bold text-indigo-600 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 dark:border-slate-700 dark:bg-slate-950/50 dark:text-indigo-400 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Prices Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 ml-1 dark:text-slate-500">Görünen F.</label>
                    <input
                      name="price"
                      defaultValue={product.price}
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm font-medium text-neutral-900 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-indigo-500/80 ml-1 dark:text-indigo-400/80">Sıralama F.</label>
                    <input
                      name="priceValue"
                      type="number"
                      defaultValue={(product as any).priceValue}
                      className="w-full rounded-lg border border-indigo-100 bg-indigo-50/30 px-3 py-2 text-sm font-bold text-indigo-900 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-300 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Info & Image */}
                <div className="space-y-3 flex-1">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-500/80 ml-1 dark:text-fuchsia-400/80">Görsel URL</label>
                    <div className="flex items-center gap-2 rounded-lg border border-fuchsia-100 bg-fuchsia-50/30 px-2 py-1 focus-within:border-fuchsia-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-fuchsia-400/10 transition-all dark:border-fuchsia-900/50 dark:bg-fuchsia-900/20 dark:focus-within:border-fuchsia-500 dark:focus-within:bg-slate-900">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white shadow-sm overflow-hidden dark:bg-slate-800">
                        {(product as any).image ? (
                           // eslint-disable-next-line @next/next/no-img-element
                          <img src={(product as any).image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300 dark:text-fuchsia-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        )}
                      </div>
                      <input
                        name="image"
                        defaultValue={(product as any).image}
                        placeholder="https://..."
                        className="w-full bg-transparent p-1 text-xs text-neutral-700 outline-none dark:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 ml-1 dark:text-slate-500">Kısa Açıklama (Vitrin)</label>
                    <textarea
                      name="info"
                      defaultValue={product.info}
                      rows={2}
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-medium text-neutral-700 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 resize-none dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 ml-1 dark:text-slate-500">Detaylı Açıklama (Sayfa)</label>
                    <textarea
                      name="description"
                      defaultValue={(product as { description?: string }).description}
                      rows={4}
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs font-medium text-neutral-700 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-400/10 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
                      placeholder="Detaylı metin..."
                    />
                  </div>
                </div>
              </form>

              {/* Actions - Outside of the update form to prevent nesting */}
              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-slate-800">
                <button
                  type="submit"
                  form={`update-form-${product.id}`}
                  className="rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white"
                >
                  Değişiklikleri Kaydet
                </button>
                <form action={deleteProduct} className="contents">
                  <input type="hidden" name="id" value={product.id} />
                  <button
                    type="submit"
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  >
                    Kaldır
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

