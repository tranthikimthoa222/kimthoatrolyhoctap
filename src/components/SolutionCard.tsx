import { Check, Volume2, Sparkles } from 'lucide-react';
import { SolutionResponse } from '../services/gemini';
import { motion } from 'motion/react';
import MathContent from './MathContent';

interface SolutionCardProps {
  solution: SolutionResponse;
  onSpeak: () => void;
  isSpeaking: boolean;
  onReset: () => void;
}

export default function SolutionCard({ solution, onSpeak, isSpeaking, onReset }: SolutionCardProps) {
  return (
    <div className="space-y-5 pb-24">
      {/* Main Solution Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="clay-card p-5 sm:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-[24px]"></div>

        {/* Title Row */}
        <div className="flex items-start justify-between gap-3 mt-2 mb-4">
          <h2 className="text-xl font-extrabold text-blue-600 leading-tight flex-1">
            {solution.title}
          </h2>
          <div className="clay-badge bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
            <Sparkles size={12} />
            Đã giải
          </div>
        </div>

        {/* Speak Button */}
        <div className="mb-5 flex justify-end">
          <button
            onClick={onSpeak}
            className={`clay-btn !py-2 !px-4 !min-h-0 flex items-center gap-2 text-sm cursor-pointer ${isSpeaking
              ? 'clay-btn-primary'
              : 'clay-btn-ghost'
              }`}
            aria-label={isSpeaking ? 'Dừng đọc' : 'Nghe lời giảng'}
          >
            <Volume2 size={18} className={isSpeaking ? 'animate-pulse-soft' : ''} />
            <span className="font-bold">{isSpeaking ? 'Đang đọc...' : 'Nghe giảng'}</span>
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {solution.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12 + 0.2 }}
              className="flex gap-3"
            >
              {/* Step Number */}
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center text-sm font-extrabold"
                style={{ boxShadow: '3px 3px 6px rgba(37,99,235,0.25)' }}>
                {index + 1}
              </div>
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <MathContent tag="div" className="font-extrabold text-slate-800 text-[15px] mb-1">{step.title}</MathContent>
                <MathContent
                  className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-2xl border-2 border-slate-100"
                  tag="div"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)' }}
                >{step.content}</MathContent>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Answer */}
        <div className="mt-6 pt-5 border-t-2 border-slate-100">
          <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-2">Kết quả:</h3>
          <div className="bg-blue-50 p-4 rounded-2xl border-3 border-blue-200 text-center"
            style={{ boxShadow: 'inset 0 2px 4px rgba(37,99,235,0.06), 4px 4px 8px rgba(37,99,235,0.08)' }}>
            <MathContent tag="div" className="text-blue-700 font-extrabold text-lg break-words">
              {solution.final_answer}
            </MathContent>
          </div>
        </div>
      </motion.div>

      {/* Success / Reset CTA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="clay-card-colored bg-gradient-to-br from-emerald-400 to-teal-500 p-6 text-center text-white border-3 border-emerald-500"
      >
        <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center mx-auto mb-3"
          style={{ boxShadow: '4px 4px 8px rgba(0,0,0,0.1)' }}>
          <Check size={28} className="text-white" strokeWidth={3} />
        </div>
        <h3 className="font-extrabold text-xl mb-1">Tuyệt vời!</h3>
        <p className="text-emerald-50 text-sm font-medium mb-5">Bạn đã nắm vững cách giải bài tập này.</p>

        <button
          onClick={onReset}
          className="clay-btn w-full !bg-white !text-emerald-600 !border-emerald-200 font-extrabold text-base cursor-pointer"
        >
          Giải bài khác ngay
        </button>
      </motion.div>
    </div>
  );
}
