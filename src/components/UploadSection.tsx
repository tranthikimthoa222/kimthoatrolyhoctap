import { Upload, Camera } from 'lucide-react';
import { useRef, ChangeEvent } from 'react';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
}

export default function UploadSection({ onImageSelect }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="clay-card p-6 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-[24px]"></div>

      <h2 className="text-xl font-extrabold text-slate-800 mt-2 mb-1">📸 Chụp ảnh bài tập</h2>
      <p className="text-sm font-medium text-slate-500 mb-6">Nhận lời giải chi tiết ngay lập tức</p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="clay-btn clay-btn-primary flex flex-col items-center justify-center gap-2 !rounded-2xl !py-5 cursor-pointer"
          aria-label="Tải ảnh lên"
        >
          <div className="bg-white/20 p-2.5 rounded-xl">
            <Upload size={28} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">Tải ảnh lên</span>
        </button>

        <button
          onClick={() => cameraInputRef.current?.click()}
          className="clay-btn clay-btn-cta flex flex-col items-center justify-center gap-2 !rounded-2xl !py-5 cursor-pointer"
          aria-label="Chụp ảnh"
        >
          <div className="bg-white/20 p-2.5 rounded-xl">
            <Camera size={28} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">Chụp ảnh</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <p className="mt-5 text-xs font-semibold text-slate-400 tracking-wide">
        Hỗ trợ JPG, PNG • Tối đa 10MB
      </p>
    </div>
  );
}
