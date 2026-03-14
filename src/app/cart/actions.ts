"use server";

import fs from "fs";
import path from "path";
import { getLocale } from "@/lib/cms";

export async function submitOrder(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const address = formData.get("address")?.toString().trim();
  const itemsRaw = formData.get("items")?.toString() || "[]";
  const total = Number(formData.get("total") || 0);

  if (!name || !email || !phone || !address) {
    return { success: false, error: "Tüm alanları doldurunuz." };
  }

  const items = JSON.parse(itemsRaw);
  if (items.length === 0) {
    return { success: false, error: "Sepetiniz boş." };
  }

  const ordersPath = path.join(process.cwd(), "data", "orders.json");
  let currentOrders = [];
  
  try {
    if (fs.existsSync(ordersPath)) {
      currentOrders = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
    }
  } catch (error) {
    // File might not be initialized properly, which is fine
  }

  const maxId = currentOrders.reduce((max: number, o: any) => (o.id > max ? o.id : max), 0);
  const locale = await getLocale();

  const newOrder = {
    id: maxId + 1,
    date: new Date().toISOString(),
    status: "pending",
    locale,
    customer: { name, email, phone, address },
    items,
    total
  };

  currentOrders.push(newOrder);

  fs.writeFileSync(ordersPath, JSON.stringify(currentOrders, null, 2), "utf-8");

  return { success: true };
}
