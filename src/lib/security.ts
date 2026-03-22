import fs from "fs";
import path from "path";
import { headers } from "next/headers";

const SECURITY_FILE = path.join(process.cwd(), "data", "auth_security.json");

interface AttemptLog {
  [ip: string]: {
    count: number;
    lastAttempt: number;
    blockedUntil?: number;
  };
}

function readLogs(): AttemptLog {
  try {
    if (!fs.existsSync(SECURITY_FILE)) return {};
    const raw = fs.readFileSync(SECURITY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveLogs(logs: AttemptLog) {
  try {
    fs.writeFileSync(SECURITY_FILE, JSON.stringify(logs, null, 2), "utf-8");
  } catch (e) {
    console.error("Security log save failed", e);
  }
}

export async function getClientIp() {
  const headersList = await headers();
  // Standard headers for getting IP (may vary by provider like Vercel/Cloudflare)
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  return forwardedFor?.split(",")[0] || realIp || "unknown-ip";
}

export async function checkRateLimit() {
  const ip = await getClientIp();
  const logs = readLogs();
  const log = logs[ip];

  if (!log) return { allowed: true, delay: 0 };

  const now = Date.now();
  
  // Check lockout
  if (log.blockedUntil && now < log.blockedUntil) {
    return { 
      allowed: false, 
      error: "Sürekli hatalı deneme nedeniyle geçici olarak engellendiniz. Lütfen daha sonra tekrar deneyin.",
      retryIn: Math.ceil((log.blockedUntil - now) / 1000 / 60)
    };
  }

  // Calculate dynamic delay based on attempt count (max 5 seconds)
  const delay = Math.min(log.count * 500, 5000);
  
  return { allowed: true, delay, count: log.count };
}

export async function logFailedAttempt() {
  const ip = await getClientIp();
  const logs = readLogs();
  const log = logs[ip] || { count: 0, lastAttempt: 0 };

  log.count += 1;
  log.lastAttempt = Date.now();

  // If more than 5 attempts, block for 15 minutes
  if (log.count >= 5) {
    log.blockedUntil = Date.now() + 15 * 60 * 1000;
  }

  logs[ip] = log;
  saveLogs(logs);
}

export async function resetAttempts() {
  const ip = await getClientIp();
  const logs = readLogs();
  if (logs[ip]) {
    delete logs[ip];
    saveLogs(logs);
  }
}
