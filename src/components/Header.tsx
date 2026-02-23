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
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-white/50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-800 tracking-tight leading-tight">Trợ Lý AI Học Tập</h1>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Học tập thông minh</p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center group"
          title="Cài đặt API Key & Model"
        >
          <div className={`p-2 rounded-xl transition-all ${!hasApiKey ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'}`}>
            <Settings size={20} className={!hasApiKey ? '' : 'group-hover:rotate-45 transition-transform duration-300'} />
          </div>
          {!hasApiKey && (
            <span className="text-[9px] font-bold text-red-500 mt-1 absolute top-[52px]">Cần API Key</span>
          )}
        </button>
      </div>
    </header>
  );
}
