import { motion } from 'motion/react';
import { Lightbulb, Cpu } from 'lucide-react';

export default function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Floating Clay Icon */}
      <div className="relative">
        <div className="clay-card !rounded-full p-8 relative animate-float">
          <Lightbulb size={52} className="text-orange-400" strokeWidth={2} />
          <motion.div
            className="absolute -bottom-2 -right-2 clay-card !rounded-full !p-2"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <Cpu size={20} className="text-blue-500" />
          </motion.div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2 px-4">
        <h3 className="text-2xl font-extrabold text-slate-800">AI đang phân tích...</h3>
        <p className="text-sm font-medium text-slate-500">Hệ thống đang trích xuất và giải bài. Xin chờ trong giây lát.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200"
        style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-orange-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
