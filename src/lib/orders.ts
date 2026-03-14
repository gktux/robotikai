import fs from "fs";
import path from "path";

const getFilePath = () => path.join(process.cwd(), "data", "orders.json");

export function getOrders(): any[] {
  try {
    if (!fs.existsSync(getFilePath())) return [];
    const raw = fs.readFileSync(getFilePath(), "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function updateOrderStatus(id: number, status: string) {
  const orders = getOrders();
  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
  fs.writeFileSync(getFilePath(), JSON.stringify(updated, null, 2), "utf-8");
}

export function deleteOrder(id: number) {
  const orders = getOrders();
  const updated = orders.filter((o) => o.id !== id);
  fs.writeFileSync(getFilePath(), JSON.stringify(updated, null, 2), "utf-8");
}
