import React, { useState } from 'react';
import { LayoutDashboard, Link as LinkIcon, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function DashboardConnector({ onConnect, initialConfig, isConnected }) {
  const [form, setForm] = useState({
    url: initialConfig?.url || '',
    access: initialConfig?.access || 'public',
    token: initialConfig?.token || '',
  });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });
    await new Promise((r) => setTimeout(r, 700));

    if (!form.url) {
      setStatus({ loading: false, error: 'Enter a valid URL to your dashboard.', success: false });
      return;
    }
    try {
      // Basic URL validation
      const u = new URL(form.url);
      if (!u.protocol.startsWith('http')) throw new Error('Invalid protocol');
    } catch {
      setStatus({ loading: false, error: 'Please provide a valid http(s) URL.', success: false });
      return;
    }

    setStatus({ loading: false, error: '', success: true });
    onConnect?.(form);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><LayoutDashboard size={20} /></div>
        <div>
          <h3 className="text-lg font-semibold">Dashboard access</h3>
          <p className="text-sm text-white/60">Provide a URL to embed or connect to your dashboard provider.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm text-white/70">Dashboard URL</span>
          <div className="relative">
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://app.your-dashboard.com/boards/123"
              className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Access</span>
          <select
            name="access"
            value={form.access}
            onChange={handleChange}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="public">Public</option>
            <option value="private">Private (token)</option>
          </select>
        </label>

        {form.access === 'private' && (
          <label className="flex flex-col gap-2 md:col-span-3">
            <span className="text-sm text-white/70">Access Token</span>
            <div className="relative">
              <input
                name="token"
                value={form.token}
                onChange={handleChange}
                placeholder="Paste token here"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            </div>
          </label>
        )}

        <div className="md:col-span-3 flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-4 py-2 font-medium transition"
            disabled={status.loading}
          >
            {status.loading ? (<><Loader2 className="animate-spin" size={18} /> Validating</>) : 'Grant access'}
          </button>
          {status.error && (
            <span className="inline-flex items-center gap-2 text-sm text-red-300"><AlertCircle size={16} /> {status.error}</span>
          )}
          {isConnected && !status.error && (
            <span className="inline-flex items-center gap-2 text-sm text-emerald-300"><CheckCircle2 size={16} /> Access granted</span>
          )}
        </div>
      </form>
    </div>
  );
}
