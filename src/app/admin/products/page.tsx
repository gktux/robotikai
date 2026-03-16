import { readCms, writeCms, readCmsWithLocale, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { ProductsManager, ProductAddForm } from "@/components/admin/ProductsManager";

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
  revalidatePath("/admin/products");
  revalidatePath("/");
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
  revalidatePath("/admin/products");
  revalidatePath("/");
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
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export default async function AdminProductsPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          ROBOTIKAI • Mağaza
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Ürün Yönetimi
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Buradan sitede görünen ürünleri, fiyatları ve stok bilgilerini yönetebilirsin.
        </p>
      </header>

      <section className="mb-14 space-y-8">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Katalogdaki Ürünler
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">{cms.shop.items.length} ÜRÜN</span>
        </div>
        
        <ProductsManager 
            items={cms.shop.items} 
            updateAction={updateProduct} 
            deleteAction={deleteProduct} 
        />
      </section>

      <section className="space-y-6 rounded-[3.5rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
        <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Mağazaya Yeni Ürün Ekle</h2>
            <p className="text-xs text-indigo-500 font-bold mt-1 uppercase tracking-widest">Envanteri Güncelle</p>
        </div>
        
        <ProductAddForm addAction={addProduct} />
      </section>
    </div>
  );
}
