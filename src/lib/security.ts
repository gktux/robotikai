import fs from "fs";
import path from "path";
import { headers } from "next/headers";

const SECURITY_FILE = path.join(process.cwd(), "data", "auth_security.json");

export interface SecurityLog {
  ip: string;
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
  isPermanent?: boolean;
}

interface AttemptLogMap {
  [ip: string]: Omit<SecurityLog, "ip">;
}

function readLogs(): AttemptLogMap {
  try {
    if (!fs.existsSync(SECURITY_FILE)) {
      // Create directory if not exists
      const dir = path.dirname(SECURITY_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      return {};
    }
    const raw = fs.readFileSync(SECURITY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveLogs(logs: AttemptLogMap) {
  try {
    fs.writeFileSync(SECURITY_FILE, JSON.stringify(logs, null, 2), "utf-8");
  } catch (e) {
    console.error("Security log save failed", e);
  }
}

export async function getClientIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  let ip = forwardedFor?.split(",")[0] || realIp || "127.0.0.1";
  
  if (ip === "::1" || ip === "::ffff:127.0.0.1") {
    ip = "127.0.0.1 (Localhost)";
  }
  
  return ip.trim();
}

export async function checkRateLimit() {
  const ip = await getClientIp();
  const logs = readLogs();
  const log = logs[ip];

  if (!log) return { allowed: true, delay: 0 };

  const now = Date.now();
  
  // 1. Check Permanent Ban
  if (log.isPermanent) {
    return { 
      allowed: false, 
      error: "Güvenlik ihlali nedeniyle bu IP adresi süresiz olarak engellenmiştir.",
      isPermanent: true
    };
  }

  // 2. Check Temporary Lockout
  if (log.blockedUntil && now < log.blockedUntil) {
    return { 
      allowed: false, 
      error: "Çok fazla hatalı deneme. Lütfen bekleyin.",
      retryIn: Math.ceil((log.blockedUntil - now) / 1000 / 60)
    };
  }

  // 3. Dynamic Delay (max 5s)
  const delay = Math.min(log.count * 500, 5000);
  
  return { allowed: true, delay, count: log.count };
}

export async function logFailedAttempt() {
  const ip = await getClientIp();
  const logs = readLogs();
  const log = logs[ip] || { count: 0, lastAttempt: 0 };

  const now = Date.now();
  
  // LOGIC: If they were previously blocked (blockedUntil exists) 
  // and they are trying again and failing, or if count is already high
  if (log.count >= 6 || (log.blockedUntil && now > log.blockedUntil)) {
    // One strike after lockout = Permanent Ban
    log.isPermanent = true;
  }

  log.count += 1;
  log.lastAttempt = now;

  // Regular lockout after 5 attempts
  if (log.count === 5 && !log.isPermanent) {
    log.blockedUntil = now + 15 * 60 * 1000;
  }

  logs[ip] = log;
  saveLogs(logs);
}

export async function resetAttempts() {
  const ip = await getClientIp();
  const logs = readLogs();
  
  if (!logs[ip]) {
    logs[ip] = {
      count: 0,
      lastAttempt: Date.now()
    };
  } else {
    logs[ip].count = 0;
    logs[ip].blockedUntil = undefined;
    logs[ip].lastAttempt = Date.now();
  }
  
  saveLogs(logs);
}

// Support for Dashboard
export async function getAllSecurityLogs(): Promise<SecurityLog[]> {
  const logs = readLogs();
  return Object.entries(logs).map(([ip, data]) => ({
    ip,
    ...data
  })).sort((a, b) => b.lastAttempt - a.lastAttempt);
}

export async function unbanIp(ip: string) {
  const logs = readLogs();
  if (logs[ip]) {
    delete logs[ip];
    saveLogs(logs);
  }
}
