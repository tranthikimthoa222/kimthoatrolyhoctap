import { BookOpen, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    const checkApiKey = () => {
      const key = localStorage.getItem('gemini_api_key');
      setHasApiKey(!!key);
    };
    checkApiKey();
    window.addEventListener('app_config_updated', checkApiKey);
    return () => window.removeEventListener('app_config_updated', checkApiKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 safe-top">
      <div className="mx-2 mt-2">
        <div className="clay-card flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="clay-btn-primary flex items-center justify-center w-11 h-11 !p-0 !min-h-0 rounded-2xl"
              style={{ boxShadow: '4px 4px 8px rgba(37,99,235,0.25), inset 0 2px 3px rgba(255,255,255,0.3)' }}>
              <BookOpen size={22} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-800 leading-tight tracking-tight">Trợ Lý Học Tập</h1>
              <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">AI • Thông minh</p>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="relative clay-btn clay-btn-ghost !p-2.5 !min-h-0 !rounded-2xl cursor-pointer"
            title="Cài đặt API Key & Model"
            aria-label="Cài đặt"
          >
            <Settings size={22} className={!hasApiKey ? 'text-orange-500' : 'text-slate-500'} />
            {!hasApiKey && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse-soft"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
