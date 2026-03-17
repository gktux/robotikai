"use client";

import { useAdmin } from "./AdminContext";
import { ImageUploadField } from "./ImageUploadField";

interface ProductItem {
  id: number;
  name: string;
  price?: string;
  priceValue?: number;
  image?: string;
  tag?: string;
  info?: string;
  description?: string;
}

export function ProductsManager({ 
  items, 
  updateAction, 
  deleteAction 
}: { 
  items: ProductItem[];
  updateAction: (fd: FormData) => Promise<void>;
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast, confirm } = useAdmin();

  const handleUpdate = async (fd: FormData) => {
    try {
      await updateAction(fd);
      showToast("Ürün başarıyla güncellendi", "success");
    } catch (e) {
      showToast("Güncelleme başarısız", "error");
    }
  };

  const handleDelete = async (fd: FormData) => {
    const ok = await confirm({
      title: "Ürünü Kaldır",
      message: "Bu ürünü mağazadan kaldırmak istediğine emin misin?",
      confirmText: "Evet, Kaldır",
      type: "danger"
    });

    if (ok) {
      try {
        await deleteAction(fd);
        showToast("Ürün kaldırıldı", "success");
      } catch (e) {
        showToast("Silme işlemi başarısız", "error");
      }
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {items.map((product) => (
        <div
          key={product.id}
          className="group relative flex flex-col rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/30 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-900/50 dark:hover:shadow-indigo-900/20"
        >
          <form action={handleUpdate} className="flex flex-col flex-1 gap-4" id={`update-form-${product.id}`}>
            <input type="hidden" name="id" value={product.id} />
            
            <div className="flex items-center justify-between mb-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ürün ID: #{product.id}</span>
                 <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Ürün Adı & Etiketi</label>
                <div className="flex gap-2">
                  <input
                    name="name"
                    defaultValue={product.name}
                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-900 outline-none transition-all focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-indigo-500"
                  />
                  <input
                    name="tag"
                    defaultValue={product.tag}
                    placeholder="Etiket"
                    className="w-28 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-black text-indigo-600 outline-none transition-all focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/50 dark:text-indigo-400 dark:focus:border-indigo-500 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Görünen Fiyat</label>
                <input
                  name="price"
                  defaultValue={product.price}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60 px-1">Sıralama Fiyatı</label>
                <input
                  name="priceValue"
                  type="number"
                  defaultValue={product.priceValue}
                  className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/30 px-4 py-2.5 text-sm font-black text-indigo-900 outline-none transition-all focus:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-300"
                />
              </div>
            </div>

            <div className="space-y-3 flex-1">
            <ImageUploadField
                name="image"
                defaultValue={product.image}
                label="Ürün Görseli"
            />
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Kısa Açıklama (Vitrin)</label>
                <textarea
                  name="info"
                  defaultValue={product.info}
                  rows={2}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Detaylı Açıklama</label>
                <textarea
                  name="description"
                  defaultValue={product.description}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs font-medium text-slate-600 outline-none transition-all focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400"
                  placeholder="Detaylı metin..."
                />
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                type="submit"
                className="rounded-full bg-slate-900 border border-slate-900 px-6 py-2.5 text-xs font-black text-white transition-all hover:bg-slate-800 active:scale-95 dark:bg-sky-600 dark:border-sky-600 dark:hover:bg-sky-500 flex items-center gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                Kaydet
                </button>
                <button
                    type="button"
                    onClick={() => handleDelete(new FormData(document.getElementById(`update-form-${product.id}`) as HTMLFormElement))}
                    className="rounded-full px-5 py-2.5 text-[11px] font-black text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 uppercase tracking-widest"
                >
                    Kaldır
                </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export function ProductAddForm({ 
  addAction 
}: { 
  addAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await addAction(fd);
          showToast("Ürün başarıyla eklendi", "success");
          (document.querySelector('form[id="add-product-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Ürün eklenirken hata oluştu", "error");
        }
      }} 
      id="add-product-form"
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5 lg:col-span-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="name">Ürün Adı</label>
          <input
            id="name"
            name="name"
            required
            placeholder="Örn: Arduino Başlangıç Seti"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-all shadow-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="price">Fiyat Etiketi</label>
          <input
            id="price"
            name="price"
            placeholder="1.299 ₺"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-indigo-500 px-1" htmlFor="priceValue">Sıralama Değeri</label>
          <input
            id="priceValue"
            name="priceValue"
            type="number"
            placeholder="1299"
            className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 text-sm font-black text-indigo-900 outline-none focus:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-100"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="tag">Kategori/Tag</label>
          <input
            id="tag"
            name="tag"
            placeholder="Örn: Popüler"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1.5 lg:col-span-3">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1" htmlFor="info">Kısa Açıklama</label>
          <input
            id="info"
            name="info"
            placeholder="Hızlı bakış özeti..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <ImageUploadField
          name="image"
          label="Ürün Görseli"
          placeholder="Görsel URL veya dosya seçin"
        />
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-1">Detaylı Açıklama</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Ürün sayfasında görünecek uzun açıklama..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-slate-950 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 active:scale-[0.99] dark:bg-sky-600 dark:hover:bg-sky-500 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Ürünü Kaydet ve Yayınla
      </button>
    </form>
  );
}
