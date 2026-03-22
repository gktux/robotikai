"use client";

import { useState, useEffect } from "react";
import { handleUnban } from "./actions";

interface SecurityLog {
  ip: string;
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
  isPermanent?: boolean;
}

export function SecurityDashboard({ initialLogs }: { initialLogs: SecurityLog[] }) {
  const [logs, setLogs] = useState<SecurityLog[]>(initialLogs);
  const [loading, setLoading] = useState(false);

  const onUnban = async (ip: string) => {
    if (!confirm(`${ip} adresinin engelini kaldırmak istediğinize emin misiniz?`)) return;
    
    setLoading(true);
    try {
      await handleUnban(ip);
      setLogs(logs.filter(l => l.ip !== ip));
    } catch (e) {
      alert("Hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Güvenlik Günlüğü</h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Giriş denemeleri ve engel durumları</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">Canlı Takip Aktif</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">IP Adresi</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Durum</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Deneme</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Son Hareket</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                    Henüz şüpheli bir hareket kaydedilmedi.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const isBlocked = log.isPermanent || (log.blockedUntil && log.blockedUntil > Date.now());
                  
                  return (
                    <tr key={log.ip} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100 font-mono text-xs">
                        {log.ip}
                      </td>
                      <td className="px-6 py-4">
                        {log.isPermanent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-black uppercase text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
                            Süresiz Yasaklı
                          </span>
                        ) : log.blockedUntil && log.blockedUntil > Date.now() ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black uppercase text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                             Kısıtlı (15dk)
                          </span>
                        ) : log.count === 0 ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                            Başarılı Giriş
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                            İzleniyor
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-black text-slate-500 text-xs">
                        {log.count === 0 ? "-" : log.count}
                      </td>
                      <td className="px-6 py-4 text-[11px] text-slate-500 font-medium">
                        {new Date(log.lastAttempt).toLocaleString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isBlocked && (
                          <button
                            onClick={() => onUnban(log.ip)}
                            disabled={loading}
                            className="rounded-lg bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-600 hover:bg-green-100 disabled:opacity-50 transition-all dark:bg-green-900/30 dark:text-green-400"
                          >
                            Engeli Kaldır
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="rounded-3xl bg-amber-50 p-6 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30">
        <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">Güvenlik Politikası Bilgisi</h4>
        <p className="text-xs text-amber-700/80 dark:text-amber-400/60 leading-relaxed font-medium">
           Sistem 5 hatalı denemeden sonra IP adresini 15 dakika dondurur. Bu süreden sonra yapılan ilk hatalı deneme, güvenliğiniz için ilgili IP adresini <strong>süresiz olarak engeller</strong>. Süresiz engeller sadece bu panelden manuel olarak kaldırılabilir.
        </p>
      </div>
    </div>
  );
}
