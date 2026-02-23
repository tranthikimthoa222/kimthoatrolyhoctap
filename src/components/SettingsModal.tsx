import { useState, useEffect } from 'react';
import { X, Key, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type AIModel = 'gemini-3-flash-preview' | 'gemini-3-pro-preview' | 'gemini-2.5-flash';

const MODELS: { id: AIModel; name: string; description: string }[] = [
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash',
    description: 'Nhanh nhất, tối ưu cho tác vụ cơ bản. (Mặc định)',
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro',
    description: 'Hiệu suất cao, phân tích hình ảnh và suy luận tốt nhất.',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Ổn định, tốc độ nhanh, phù hợp làm dự phòng.',
  },
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
    // Dispatch event to notify other components of config changes
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-all"
            onClick={!isInitialSetup ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl"
          >
            <div className="bg-white/90 backdrop-blur-md border border-white/60 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-xl text-white shadow-md shadow-blue-200">
                    <Zap size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Cấu hình hệ thống AI</h2>
                </div>
                {!isInitialSetup && (
                  <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                {isInitialSetup && (
                  <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 text-blue-800 text-sm">
                    <p className="font-semibold mb-1">Chào mừng bạn!</p>
                    <p>Để bắt đầu sử dụng Trợ Lý, vui lòng thiết lập API Key của bạn. Hệ thống sẽ tự động lưu lại cho các lần sau.</p>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-700">1. Chọn Mô Hình Trí Tuệ Nhân Tạo</label>
                  <div className="grid grid-cols-1 gap-3">
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                          selectedModel === model.id
                            ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50 relative'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="block font-semibold text-slate-800">{model.name}</span>
                            <span className="block text-sm text-slate-500 mt-1">{model.description}</span>
                          </div>
                          {selectedModel === model.id ? (
                            <CheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">2. Google Gemini API Key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key size={18} className="text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Nhập API Key của bạn"
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base placeholder:text-slate-400 font-mono shadow-inner"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2 px-1">
                    Cần sự trợ giúp? Lấy API Key miễn phí tại{' '}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2 decoration-blue-200 hover:decoration-blue-500 transition-colors"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98] drop-shadow-md text-lg"
                >
                  {isInitialSetup ? 'Bắt Đầu Sử Dụng' : 'Lưu Thay Đổi'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
