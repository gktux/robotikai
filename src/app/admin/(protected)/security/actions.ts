"use server";

import { getAllSecurityLogs, unbanIp } from "@/lib/security";
import { revalidatePath } from "next/cache";

export async function fetchSecurityLogs() {
  return await getAllSecurityLogs();
}

export async function handleUnban(ip: string) {
  await unbanIp(ip);
  revalidatePath("/admin/security");
}
