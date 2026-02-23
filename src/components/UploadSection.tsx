import { Upload, Camera } from 'lucide-react';
import { useRef, ChangeEvent } from 'react';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
}

export default function UploadSection({ onImageSelect }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 text-center border border-white/60 relative overflow-hidden group/container transition-all hover:shadow-blue-500/10">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-80"></div>

      <h2 className="text-2xl font-extrabold text-slate-800 mb-2 mt-2">Chụp ảnh bài tập</h2>
      <p className="text-sm font-medium text-slate-500 mb-8 px-4">Nhận lời giải chi tiết và từng bước giải ngay lập tức</p>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center bg-white/50 hover:bg-white/90 border border-blue-100/50 rounded-3xl p-6 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 ring-1 ring-blue-100">
            <Upload className="text-blue-500" size={26} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">Tải ảnh lên</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center bg-white/50 hover:bg-white/90 border border-purple-100/50 rounded-3xl p-6 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1"
        >
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300 ring-1 ring-purple-100">
            <Camera className="text-purple-500" size={26} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-700 text-sm group-hover:text-purple-600 transition-colors">Chụp ảnh</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-slate-100/50 text-[11px] font-semibold tracking-wide text-slate-400 border border-slate-200/50">
        HỖ TRỢ JPG, PNG &bull; TỐI ĐA 10MB
      </div>
    </div>
  );
}
