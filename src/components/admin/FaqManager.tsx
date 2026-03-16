"use client";

import { useAdmin } from "./AdminContext";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export function FaqManager({ 
  items, 
  deleteAction 
}: { 
  items: FaqItem[];
  deleteAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast, confirm } = useAdmin();

  const handleDelete = async (fd: FormData) => {
    const ok = await confirm({
      title: "Soruyu Sil",
      message: "Bu soruyu silmek istediğine emin misin?",
      confirmText: "Evet, Sil",
      type: "danger"
    });

    if (ok) {
        try {
            await deleteAction(fd);
            showToast("Soru silindi", "success");
        } catch (e) {
            showToast("Silme işlemi başarısız", "error");
        }
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-800/20 dark:hover:bg-slate-800/40">
           <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                 <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">{item.question}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{item.answer}</p>
              </div>
              <form action={handleDelete}>
                 <input type="hidden" name="id" value={item.id} />
                 <button type="submit" className="text-slate-300 hover:text-red-500 transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                 </button>
              </form>
           </div>
        </div>
      ))}
    </div>
  );
}

export function FaqHeaderForm({ 
  initialData, 
  updateAction 
}: { 
  initialData: { title: string; intro: string };
  updateAction: (fd: FormData) => Promise<void>;
}) {
  const { showToast } = useAdmin();

  return (
    <form 
      action={async (fd) => {
        try {
          await updateAction(fd);
          showToast("SSS başlıkları güncellendi", "success");
        } catch (e) {
          showToast("Güncelleme başarısız", "error");
        }
      }} 
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Sayfa Başlığı</label>
        <input
          name="title"
          defaultValue={initialData.title}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tanıtım Metni</label>
        <input
          name="intro"
          defaultValue={initialData.intro}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
        />
      </div>
      <button type="submit" className="rounded-full bg-slate-900 px-8 py-3 text-xs font-black text-white hover:bg-slate-800 transition-all active:scale-95 dark:bg-sky-600 dark:hover:bg-sky-500">
        Başlıkları Kaydet
      </button>
    </form>
  );
}

export function FaqAddForm({ 
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
          showToast("Yeni soru başarıyla eklendi", "success");
          (document.querySelector('form[id="add-faq-form"]') as HTMLFormElement)?.reset();
        } catch (e) {
          showToast("Soru eklenirken hata oluştu", "error");
        }
      }} 
      id="add-faq-form"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Soru</label>
        <input
          name="question"
          required
          placeholder="Kullanıcıların en çok sorduğu soru..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Cevap</label>
        <textarea
          name="answer"
          required
          placeholder="Detaylı ve açıklayıcı cevap..."
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
      <button type="submit" className="w-full rounded-full bg-sky-600 py-4 text-sm font-black text-white shadow-xl shadow-sky-600/20 transition-all hover:bg-sky-500 active:scale-[0.99] flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Soruyu Yayınla
      </button>
    </form>
  );
}
