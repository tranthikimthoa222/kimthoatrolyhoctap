import { Check, Volume2, Sparkles } from 'lucide-react';
import { SolutionResponse } from '../services/gemini';
import { motion } from 'motion/react';

interface SolutionCardProps {
  solution: SolutionResponse;
  onSpeak: () => void;
  isSpeaking: boolean;
  onReset: () => void;
}

export default function SolutionCard({ solution, onSpeak, isSpeaking, onReset }: SolutionCardProps) {
  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-6 sm:p-8 border border-white/60 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6 gap-4">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
              {solution.title}
            </h2>
            <span className="flex-shrink-0 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-emerald-200/50 flex items-center gap-1">
              <Sparkles size={12} />
              Đã giải xong
            </span>
          </div>

          <div className="mb-8 flex justify-end">
            <button
              onClick={onSpeak}
              className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 shadow-sm ${isSpeaking
                  ? 'bg-blue-500 text-white shadow-blue-500/30 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
                }`}
            >
              <Volume2 size={18} className={isSpeaking ? 'animate-pulse' : ''} />
              <span>{isSpeaking ? 'Đang đọc...' : 'Nghe lời giảng'}</span>
            </button>
          </div>

          <div className="space-y-6">
            {solution.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-transparent before:rounded-full group"
              >
                <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
                <h3 className="font-extrabold text-slate-800 text-base mb-2">{step.title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">{step.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider mb-3">Kết quả cuối cùng:</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 shadow-inner">
              <p className="text-blue-800 font-mono font-bold text-xl text-center break-words">
                {solution.final_answer}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-[2rem] shadow-2xl p-8 text-white text-center relative overflow-hidden group/success"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 shadow-inner group-hover/success:scale-110 group-hover/success:rotate-12 transition-all duration-500">
            <Check size={32} className="text-white drop-shadow-md" strokeWidth={3} />
          </div>
          <h3 className="font-extrabold text-2xl mb-2 tracking-tight drop-shadow-sm">Tuyệt vời!</h3>
          <p className="text-emerald-50 text-[15px] mb-8 font-medium">Bạn đã nắm vững cách giải bài tập này.</p>

          <button
            onClick={onReset}
            className="bg-white text-emerald-600 font-extrabold py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-300 w-full text-lg active:scale-[0.98]"
          >
            Giải bài khác ngay
          </button>
        </div>
      </motion.div>
    </div>
  );
}
