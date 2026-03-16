import { readCmsWithLocale, writeCms, readCms, getLocale } from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { CoursesManager, CourseAddForm } from "@/components/admin/CoursesManager";

async function addCourse(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString().trim() ?? "";
  const level = formData.get("level")?.toString().trim() ?? "";
  const duration = formData.get("duration")?.toString().trim() ?? "";
  const highlight = formData.get("highlight")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const regLabel = formData.get("regLabel")?.toString().trim() ?? "Ön Kayıt";
  const regTitle = formData.get("regTitle")?.toString().trim() ?? "Şimdi Başvur";
  const regButton = formData.get("regButton")?.toString().trim() ?? "Kayıt Ol";
  const regLink = formData.get("regLink")?.toString().trim() ?? "/contact";
  const regEnabled = formData.get("regEnabled") === "on";

  if (!title) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  const maxId = items.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  writeCms({
    courses: {
      ...current.courses,
      items: [
        ...items,
        {
          id: maxId + 1,
          title,
          level,
          duration,
          highlight,
          content,
          regLabel,
          regTitle,
          regButton,
          regLink,
          regEnabled,
        },
      ],
    },
  }, locale);
  revalidatePath("/admin/courses");
  revalidatePath("/");
}

async function deleteCourse(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  
  writeCms({
    courses: {
      ...current.courses,
      items: items.filter((item) => item.id !== id),
    },
  }, locale);
  revalidatePath("/admin/courses");
  revalidatePath("/");
}

async function updateCourse(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;

  const title = formData.get("title")?.toString().trim() ?? "";
  const level = formData.get("level")?.toString().trim() ?? "";
  const duration = formData.get("duration")?.toString().trim() ?? "";
  const highlight = formData.get("highlight")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const regLabel = formData.get("regLabel")?.toString().trim() ?? "";
  const regTitle = formData.get("regTitle")?.toString().trim() ?? "";
  const regButton = formData.get("regButton")?.toString().trim() ?? "";
  const regLink = formData.get("regLink")?.toString().trim() ?? "";
  const regEnabled = formData.get("regEnabled") === "on";

  const locale = await getLocale();
  const current = readCms(locale);

  const items = current.courses.items as any[];
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          level,
          duration,
          highlight,
          content,
          regLabel,
          regTitle,
          regButton,
          regLink,
          regEnabled,
        }
      : item
  );

  writeCms({
    courses: {
      ...current.courses,
      items: updatedItems,
    },
  }, locale);
  revalidatePath("/admin/courses");
  revalidatePath("/");
}

export default async function AdminCoursesPage() {
  const cms = await readCmsWithLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-slate-900 dark:text-slate-100">
      <header className="mb-10 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          ROBOTIKAI • Eğitimler
        </p>
        <h1 className="text-3xl font-black tracking-tighter md:text-4xl">
          Eğitim Programları
        </h1>
        <p className="max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Buradan sitede görünen eğitim programlarını ekleyebilir, düzenleyebilir
          veya silebilirsin.
        </p>
      </header>

      <section className="mb-12 space-y-6">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Aktif Programlar
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter">{cms.courses.items.length} PROGRAM</span>
        </div>
        
        <CoursesManager 
            items={cms.courses.items} 
            updateAction={updateCourse} 
            deleteAction={deleteCourse} 
        />
      </section>

      <section className="space-y-6 rounded-[3rem] border border-indigo-100 bg-white p-10 shadow-xl shadow-indigo-100/20 dark:border-indigo-900/40 dark:bg-slate-900/80 dark:shadow-none">
        <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Yeni Eğitim Ekle</h2>
            <p className="text-xs text-indigo-500 font-bold mt-1 uppercase tracking-widest">Katalog Genişlet</p>
        </div>
        
        <CourseAddForm addAction={addCourse} />
      </section>
    </div>
  );
}
