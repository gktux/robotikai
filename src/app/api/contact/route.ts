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

    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    let ip = forwardedFor?.split(",")[0] || realIp || "127.0.0.1";
    
    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
      ip = "127.0.0.1 (Localhost)";
    }
    ip = ip.trim();

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
      ip: ip,
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
