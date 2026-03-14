"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Code,
  Palette
} from "lucide-react";
import { useState, useEffect } from "react";

interface EditorFieldProps {
  name: string;
  defaultValue?: string;
}

export function EditorField({ name, defaultValue = "" }: EditorFieldProps) {
  const [content, setContent] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      TextStyle,
      Color,
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none dark:prose-invert focus:outline-none min-h-[300px] px-4 py-3 leading-relaxed",
      },
    },
  });

  const colors = [
    { label: "Siyah", value: "#000000" },
    { label: "Gri", value: "#4b5563" },
    { label: "Mavi", value: "#0ea5e9" },
    { label: "Kırmızı", value: "#ef4444" },
    { label: "Yeşil", value: "#22c55e" },
  ];

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            editor?.chain().focus().setImage({ src: data.url }).run();
          } else {
            alert("Resim yüklenirken bir hata oluştu.");
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert("Resim yüklenemedi.");
        }
      }
    };
    input.click();
  };

  const setLink = () => {
    const url = window.prompt("URL girin:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-slate-300 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={<Bold size={16} />}
          title="Kalın"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic size={16} />}
          title="İtalik"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          icon={<UnderlineIcon size={16} />}
          title="Altı Çizili"
        />
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          icon={<Heading1 size={16} />}
          title="Başlık 1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 size={16} />}
          title="Başlık 2"
        />
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<List size={16} />}
          title="Liste"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered size={16} />}
          title="Sıralı Liste"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          icon={<Quote size={16} />}
          title="Alıntı"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          icon={<Code size={16} />}
          title="Kod"
        />
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <div className="flex items-center gap-0.5 px-1">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => editor.chain().focus().setColor(color.value).run()}
              className={`h-5 w-5 rounded-full border border-slate-300 transition-transform hover:scale-110 dark:border-slate-600 ${
                editor.isActive("textStyle", { color: color.value }) ? "ring-2 ring-sky-400 ring-offset-1 dark:ring-offset-slate-900" : ""
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="ml-1 text-[10px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            title="Rengi Sıfırla"
          >
            Sıfırla
          </button>
        </div>
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <ToolbarButton
          onClick={setLink}
          active={editor.isActive("link")}
          icon={<LinkIcon size={16} />}
          title="Link Ekle"
        />
        <ToolbarButton
          onClick={addImage}
          icon={<ImageIcon size={16} />}
          title="Resim Ekle"
        />
        <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-700" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo size={16} />}
          title="Geri Al"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo size={16} />}
          title="İleri Al"
        />
      </div>
      <div className="rounded-b-xl border-x border-b border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950">
        <EditorContent editor={editor} />
      </div>
      <input type="hidden" name={name} value={content} />
    </div>
  );
}

function ToolbarButton({ 
  onClick, 
  active = false, 
  icon, 
  title 
}: { 
  onClick: () => void; 
  active?: boolean; 
  icon: React.ReactNode; 
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
        active 
          ? "bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400" 
          : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
    </button>
  );
}
