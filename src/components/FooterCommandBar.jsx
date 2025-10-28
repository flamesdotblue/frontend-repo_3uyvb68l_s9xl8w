import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function FooterCommandBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const v = value.trim();
    if (!v) return;
    onSubmit?.(v);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your instructions..."
            className="flex-1 resize-none rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSend}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 px-4 py-2 font-medium"
          >
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
