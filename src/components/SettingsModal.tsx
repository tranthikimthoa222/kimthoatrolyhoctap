import { useState, useEffect } from 'react';
import { X, Key, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type AIModel = 'gemini-3-flash-preview' | 'gemini-3-pro-preview' | 'gemini-2.5-flash';

const MODELS: { id: AIModel; name: string; desc: string; badge: string }[] = [
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', desc: 'Nhanh nhất, tối ưu cho bài đơn giản.', badge: 'Mặc định' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro', desc: 'Hiệu suất cao, phân tích tốt nhất.', badge: 'Pro' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Ổn định, phù hợp làm dự phòng.', badge: 'Dự phòng' },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInitialSetup?: boolean;
}

export default function SettingsModal({ isOpen, onClose, isInitialSetup = false }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-3-flash-preview');

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('gemini_api_key') || '';
      const storedModel = (localStorage.getItem('gemini_ai_model') as AIModel) || 'gemini-3-flash-preview';
      setApiKey(storedKey);
      setSelectedModel(storedModel);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('Vui lòng nhập API Key để tiếp tục.');
      return;
    }
    localStorage.setItem('gemini_api_key', apiKey.trim());
    localStorage.setItem('gemini_ai_model', selectedModel);
    onClose();
    window.dispatchEvent(new Event('app_config_updated'));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={!isInitialSetup ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
          >
            <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh] border-t-3 sm:border-3 border-slate-200"
              style={{ boxShadow: '0 -8px 30px rgba(0,0,0,0.1)' }}>

              {/* Header */}
              <div className="px-5 py-4 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="clay-btn-primary flex items-center justify-center w-10 h-10 !p-0 !min-h-0 rounded-xl"
                    style={{ boxShadow: '3px 3px 6px rgba(37,99,235,0.2)' }}>
                    <Zap size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-800">Cấu hình AI</h2>
                </div>
                {!isInitialSetup && (
                  <button onClick={onClose} className="clay-btn clay-btn-ghost !p-2 !min-h-0 !rounded-xl cursor-pointer" aria-label="Đóng">
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-5">

                {isInitialSetup && (
                  <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 text-sm text-blue-700"
                    style={{ boxShadow: 'inset 0 2px 4px rgba(37,99,235,0.04)' }}>
                    <p className="font-bold mb-1">👋 Chào mừng bạn!</p>
                    <p>Thiết lập API Key để bắt đầu sử dụng Trợ Lý AI.</p>
                  </div>
                )}

                {/* Model Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">1. Chọn Mô Hình AI</label>
                  <div className="space-y-2">
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border-3 transition-all duration-200 cursor-pointer ${selectedModel === model.id
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-slate-100 bg-white hover:border-slate-200'
                          }`}
                        style={selectedModel === model.id ? { boxShadow: '4px 4px 8px rgba(37,99,235,0.08), inset 0 2px 3px rgba(255,255,255,0.5)' } : { boxShadow: '3px 3px 6px rgba(0,0,0,0.04)' }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-800 text-sm">{model.name}</span>
                              <span className="clay-badge !py-0.5 !px-2 !text-[10px] bg-slate-100 text-slate-500 border-slate-200">{model.badge}</span>
                            </div>
                            <span className="block text-xs text-slate-500 mt-0.5 font-medium">{model.desc}</span>
                          </div>
                          {selectedModel === model.id ? (
                            <CheckCircle className="text-blue-500 flex-shrink-0" size={22} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* API Key Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">2. Google Gemini API Key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Nhập API Key của bạn"
                      className="w-full pl-11 pr-4 clay-input font-mono text-sm"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    Lấy API Key miễn phí tại{' '}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                      className="text-blue-500 font-bold underline underline-offset-2 cursor-pointer">
                      Google AI Studio
                    </a>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t-2 border-slate-100 bg-slate-50 safe-bottom">
                <button onClick={handleSave}
                  className="clay-btn clay-btn-primary w-full text-base cursor-pointer">
                  {isInitialSetup ? '🚀 Bắt Đầu Sử Dụng' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
