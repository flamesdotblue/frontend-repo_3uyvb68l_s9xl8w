import React from 'react';
import { LayoutDashboard, Database, CheckCircle2, Shield } from 'lucide-react';

export default function DashboardPreview({ dbConnected, dashboardUrl }) {
  const ready = dbConnected && !!dashboardUrl;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400"><LayoutDashboard size={20} /></div>
          <div>
            <h3 className="text-lg font-semibold">Live dashboard</h3>
            <p className="text-sm text-white/60">Rendered directly inside this workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${dbConnected ? 'border-emerald-500/30 text-emerald-300' : 'border-white/20 text-white/60'}`}>
            <Database size={14} /> DB {dbConnected ? 'connected' : 'not connected'}
          </span>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${dashboardUrl ? 'border-emerald-500/30 text-emerald-300' : 'border-white/20 text-white/60'}`}>
            <Shield size={14} /> Access {dashboardUrl ? 'granted' : 'pending'}
          </span>
        </div>
      </div>

      <div className="h-[480px] bg-gradient-to-br from-slate-900/40 to-slate-800/40 relative">
        {ready ? (
          <iframe
            src={dashboardUrl}
            title="Embedded dashboard"
            className="w-full h-full"
            allow="fullscreen; clipboard-read; clipboard-write"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="mb-4 text-emerald-300"><CheckCircle2 size={28} /></div>
            <h4 className="text-xl font-semibold mb-2">Almost there</h4>
            <p className="text-white/70 max-w-xl">Connect a database and provide dashboard access. Once both are set, your dashboard will appear here, fully interactive.</p>

            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
              <div className="rounded-xl border border-white/10 p-4 text-left">
                <div className="text-sm text-white/70 mb-2">Metrics preview</div>
                <div className="grid grid-cols-3 gap-3">
                  {['Revenue', 'Users', 'Latency'].map((m, i) => (
                    <div key={m} className="rounded-lg bg-white/5 border border-white/10 p-3">
                      <div className="text-xs text-white/60">{m}</div>
                      <div className="text-lg font-semibold mt-1">{["$48k","12.4k","132ms"][i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-white/70 mb-2">Trend sketch</div>
                <div className="h-28 w-full rounded-md bg-gradient-to-tr from-indigo-500/20 to-emerald-400/20"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
