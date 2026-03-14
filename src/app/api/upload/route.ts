import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dosya adını güvenli hale getir ve benzersiz yap
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Klasör yoksa oluştur
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const path = join(uploadDir, fileName);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      url: `/uploads/${fileName}` 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Yükleme sırasında bir hata oluştu." }, { status: 500 });
  }
}
