'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'domain-migration-dismissed';

export default function DomainMigrationPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#122861] border border-[#2A8AFB]/40 rounded-xl shadow-2xl max-w-lg w-full p-6 relative text-white">
        <button
          onClick={dismiss}
          aria-label="Dismiss notice"
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-[#56EF9F] font-semibold text-lg mb-1">
          📢 Domain &amp; Email Migration Notice
        </h3>
        <p className="text-white/70 text-sm mb-4">
          From <span className="text-white font-medium">July 29th, 2026</span>, Cakradana will
          transition to new domains as <code className="text-[#67B8E3]">cakradana.org</code> will
          not be renewed:
        </p>

        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span>🌐</span>
            <span>
              <span className="text-white/60">Website: </span>
              <a
                href="https://cakradana.faizath.com"
                className="text-[#2A8AFB] hover:underline"
              >
                cakradana.faizath.com
              </a>
              <span className="text-white/40 ml-1">(formerly cakradana.org)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span>⚙️</span>
            <span>
              <span className="text-white/60">API: </span>
              <a
                href="https://cakradana-api.faizath.com"
                className="text-[#2A8AFB] hover:underline"
              >
                cakradana-api.faizath.com
              </a>
              <span className="text-white/40 ml-1">(formerly api.cakradana.org)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span>📧</span>
            <span>
              <span className="text-white/60">Email: </span>
              <a
                href="mailto:contact@cakradana.faizath.com"
                className="text-[#2A8AFB] hover:underline"
              >
                contact@cakradana.faizath.com
              </a>
              <span className="text-white/40 ml-1">(formerly contact@cakradana.org)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span>🛰️</span>
            <span>
              <span className="text-white/60">CDN: </span>
              <span className="text-[#2A8AFB]">cakradana-cdn.faizath.com</span>
              <span className="text-white/40 ml-1">(formerly cdn.cakradana.org)</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span>📈</span>
            <span>
              <span className="text-white/60">Status: </span>
              <a
                href="https://status.faizath.com/status/cakradana"
                className="text-[#2A8AFB] hover:underline"
              >
                status.faizath.com/status/cakradana
              </a>
              <span className="text-white/40 ml-1">(formerly status.cakradana.org)</span>
            </span>
          </li>
        </ul>

        <button
          onClick={dismiss}
          className="mt-5 w-full py-2 rounded-lg bg-[#2A8AFB]/20 hover:bg-[#2A8AFB]/30 border border-[#2A8AFB]/40 text-[#2A8AFB] text-sm font-medium transition-colors"
        >
          Got it, dismiss
        </button>
      </div>
    </div>
  );
}
