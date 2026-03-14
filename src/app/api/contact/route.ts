import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "data", "contact-messages.json");

function getMessages() {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "E-posta gerekli." },
        { status: 400 }
      );
    }

    const messages = getMessages();
    messages.push({
      id: Date.now(),
      name: String(name ?? "").trim(),
      email: String(email ?? "").trim(),
      message: String(message ?? "").trim(),
      createdAt: new Date().toISOString(),
    });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Mesajınız alındı." });
  } catch (e) {
    return NextResponse.json(
      { error: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
