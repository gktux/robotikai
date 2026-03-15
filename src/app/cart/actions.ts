"use server";

import fs from "fs";
import path from "path";
import { getLocale } from "@/lib/cms";

export async function submitOrder(formData: FormData) {
  try {
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

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const ordersPath = path.join(dataDir, "orders.json");
    let currentOrders = [];
    
    if (fs.existsSync(ordersPath)) {
      try {
        const fileContent = fs.readFileSync(ordersPath, "utf-8");
        currentOrders = fileContent ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.error("Order parse error:", parseError);
        currentOrders = [];
      }
    }

    const maxId = currentOrders.reduce((max: number, o: any) => (o.id > max ? o.id : max), 0);
    const locale = await getLocale();

    const newOrder = {
      id: maxId + 1,
      date: new Date().toISOString(),
      status: "beklemede",
      locale,
      customer: { name, email, phone, address },
      items,
      total
    };

    currentOrders.push(newOrder);

    fs.writeFileSync(ordersPath, JSON.stringify(currentOrders, null, 2), "utf-8");

    return { success: true };
  } catch (error) {
    console.error("Submit order error:", error);
    return { success: false, error: "Sipariş işlenirken sunucuda bir hata oluştu. Lütfen tekrar deneyin." };
  }
}
