import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type OrderItem = { id: number; name: string; price: string; quantity: number };

type Order = {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: "beklemede" | "odeme_alindi" | "kargoda" | "tamamlandi";
  createdAt: string;
};

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

function getOrders(): Order[] {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  fs.writeFileSync(
    ORDERS_FILE,
    JSON.stringify(orders, null, 2),
    "utf-8"
  );
}

function generateId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, name, email, phone, address } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Sepet boş." },
        { status: 400 }
      );
    }

    const order: Order = {
      id: generateId(),
      items,
      customer: {
        name: String(name ?? "").trim(),
        email: String(email ?? "").trim(),
        phone: String(phone ?? "").trim(),
        address: String(address ?? "").trim(),
      },
      status: "beklemede",
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Sipariş alındı.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Sipariş oluşturulamadı." },
      { status: 500 }
    );
  }
}
