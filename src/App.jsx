import React, { useState } from 'react';
import { Plug, Settings } from 'lucide-react';
import DatabaseConnector from './components/DatabaseConnector';
import DashboardConnector from './components/DashboardConnector';
import DashboardPreview from './components/DashboardPreview';
import FooterCommandBar from './components/FooterCommandBar';

function App() {
  const [dbConfig, setDbConfig] = useState(null);
  const [dashboardConfig, setDashboardConfig] = useState(null);

  const dbConnected = !!dbConfig;
  const dashboardConnected = !!dashboardConfig?.url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-28">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/20 grid place-items-center text-indigo-300"><Plug size={18} /></div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Unified Dashboards</h1>
              <p className="text-xs text-white/60">Connect data. Grant access. View in one place.</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 text-sm border border-white/10">
            <Settings size={16} /> Preferences
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Connectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DatabaseConnector
            onConnect={(cfg) => setDbConfig(cfg)}
            initialConfig={dbConfig}
            isConnected={dbConnected}
          />

          <DashboardConnector
            onConnect={(cfg) => setDashboardConfig(cfg)}
            initialConfig={dashboardConfig}
            isConnected={dashboardConnected}
          />
        </div>

        {/* Preview */}
        <DashboardPreview dbConnected={dbConnected} dashboardUrl={dashboardConfig?.url} />
      </main>

      {/* Footer command bar */}
      <FooterCommandBar onSubmit={(text) => {
        console.log('User input:', text);
      }} />
    </div>
  );
}

export default App;
