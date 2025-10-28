import React, { useState } from 'react';
import { Database, Shield, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const dbTypes = [
  { value: 'postgres', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'mssql', label: 'SQL Server' },
];

export default function DatabaseConnector({ onConnect, initialConfig, isConnected }) {
  const [form, setForm] = useState({
    type: initialConfig?.type || 'postgres',
    host: initialConfig?.host || '',
    port: initialConfig?.port || '',
    database: initialConfig?.database || '',
    user: initialConfig?.user || '',
    password: initialConfig?.password || '',
    auth: initialConfig?.auth || 'basic',
    ssl: initialConfig?.ssl || false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    await new Promise((r) => setTimeout(r, 900));

    if (!form.host || !form.port || !form.database || !form.user || !form.password) {
      setStatus({ loading: false, error: 'Please fill in all required fields.', success: false });
      return;
    }

    setStatus({ loading: false, error: '', success: true });
    onConnect?.(form);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Database size={20} /></div>
        <div>
          <h3 className="text-lg font-semibold">Connect your database</h3>
          <p className="text-sm text-white/60">Securely link a data source to power your dashboards.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Type</span>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {dbTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Authentication</span>
          <select
            name="auth"
            value={form.auth}
            onChange={handleChange}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="basic">Username & Password</option>
            <option value="token">Token / IAM</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Host</span>
          <input
            name="host"
            value={form.host}
            onChange={handleChange}
            placeholder="db.example.com"
            className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Port</span>
          <input
            name="port"
            value={form.port}
            onChange={handleChange}
            placeholder="5432"
            className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Database</span>
          <input
            name="database"
            value={form.database}
            onChange={handleChange}
            placeholder="analytics"
            className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">User</span>
            <input
              name="user"
              value={form.user}
              onChange={handleChange}
              placeholder="read_only"
              className="rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-white/70">Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
        </div>

        <label className="inline-flex items-center gap-2 md:col-span-2">
          <input type="checkbox" name="ssl" checked={form.ssl} onChange={handleChange} className="h-4 w-4 rounded border-white/20 bg-white/10" />
          <span className="text-sm text-white/80 flex items-center gap-2"><Shield size={14} /> Require SSL</span>
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 py-2 font-medium transition"
            disabled={status.loading}
          >
            {status.loading ? (<><Loader2 className="animate-spin" size={18} /> Testing connection</>) : 'Connect'}
          </button>
          {status.error && (
            <span className="inline-flex items-center gap-2 text-sm text-red-300"><AlertCircle size={16} /> {status.error}</span>
          )}
          {isConnected && !status.error && (
            <span className="inline-flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 size={16} /> Connected</span>
          )}
        </div>
      </form>
    </div>
  );
}
