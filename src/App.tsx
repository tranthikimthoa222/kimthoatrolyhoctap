import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import LoadingView from './components/LoadingView';
import SolutionCard from './components/SolutionCard';
import ComparisonTable from './components/ComparisonTable';
import SettingsModal from './components/SettingsModal';
import AuthorProfile from './components/AuthorProfile';
import LoginScreen from './components/LoginScreen';
import { analyzeImage, SolutionResponse } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

type Screen = 'home' | 'preview' | 'analyzing' | 'solution';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('tro_ly_logged_in') === 'true');
  const [screen, setScreen] = useState<Screen>('home');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState<SolutionResponse | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInitialSetup, setIsInitialSetup] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Check if API key exists on first load
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      setIsSettingsOpen(true);
      setIsInitialSetup(true);
    }
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    setScreen('preview');
  };

  const handleCancelPreview = () => {
    setImageFile(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setScreen('home');
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setScreen('analyzing');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const result = await analyzeImage(base64String);
          setSolution(result);
          setScreen('solution');
        } catch (error: any) {
          console.error(error);
          const msg = error?.message || "";
          if (msg === 'API_KEY_MISSING' || msg === 'API_KEY_INVALID' || msg === 'API_KEY_QUOTA_EXCEEDED') {
            let alertMsg = 'Vui lòng kiểm tra lại API Key.';
            if (msg === 'API_KEY_MISSING') alertMsg = 'Bạn chưa thiết lập API Key. Vui lòng nhập API Key để sử dụng AI.';
            if (msg === 'API_KEY_INVALID') alertMsg = 'API Key không hợp lệ. Vui lòng kiểm tra lại.';
            if (msg === 'API_KEY_QUOTA_EXCEEDED') alertMsg = 'API Key đã hết lượt sử dụng theo giới hạn (Quota Exceeded). Vui lòng sử dụng tài khoản Gmail khác để tạo Key mới hoặc chờ đến ngày mai.';

            alert(alertMsg);
            setScreen('home');
            setIsSettingsOpen(true);
          } else {
            alert(msg || "Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.");
            setScreen('home');
          }
        }
      };
    } catch (error) {
      console.error(error);
      setScreen('home');
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!solution?.explanation_for_speech) return;

    const utterance = new SpeechSynthesisUtterance(solution.explanation_for_speech);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setImageFile(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setSolution(null);
    setScreen('home');
  };

  return (
    <div className="min-h-screen edu-bg font-sans pb-12 safe-bottom">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          setIsInitialSetup(false);
        }}
        isInitialSetup={isInitialSetup}
      />

      <main className="max-w-md mx-auto px-3 pt-4">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-5"
            >
              <AuthorProfile />

              <div className="text-center space-y-1 py-2">
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Học tập <span className="text-blue-500">thông minh</span>
                </h2>
                <p className="text-sm font-medium text-slate-500">Chụp ảnh bài tập – Nhận lời giải ngay!</p>
              </div>

              <UploadSection onImageSelect={handleImageSelect} />

              <ComparisonTable />
            </motion.div>
          )}

          {screen === 'preview' && imagePreviewUrl && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="clay-card p-5"
            >
              <h3 className="font-extrabold text-lg text-slate-800 mb-4 text-center">Xác nhận ảnh</h3>
              <div className="rounded-2xl overflow-hidden mb-5 bg-slate-50 aspect-[3/4] border-2 border-slate-100"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)' }}>
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelPreview}
                  className="flex-1 clay-btn clay-btn-ghost flex items-center justify-center gap-2 cursor-pointer"
                >
                  <X size={20} />
                  <span>Hủy</span>
                </button>
                <button
                  onClick={handleAnalyze}
                  className="flex-1 clay-btn clay-btn-cta flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check size={20} />
                  <span>Giải bài</span>
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingView />
            </motion.div>
          )}

          {screen === 'solution' && solution && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SolutionCard
                solution={solution}
                onSpeak={handleSpeak}
                isSpeaking={isSpeaking}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
