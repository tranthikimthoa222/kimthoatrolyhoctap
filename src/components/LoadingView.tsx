import { motion } from 'motion/react';
import { CloudLightning, Cpu, Sparkles } from 'lucide-react';

export default function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-10">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-full opacity-30 blur-2xl scale-[1.8]"
        />
        <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-full shadow-2xl border border-white/60 z-10">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <CloudLightning size={56} className="text-blue-500 drop-shadow-md" strokeWidth={1.5} />
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-2 -right-2 text-purple-400"
            >
              <Sparkles size={16} />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-3 -right-3 bg-gradient-to-br from-white to-purple-50 p-2.5 rounded-full shadow-xl border border-white/80"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cpu size={24} className="text-purple-600" />
          </motion.div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <motion.h3
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% auto' }}
        >
          AI Đang Phân Tích
        </motion.h3>
        <p className="text-slate-500 text-[15px] font-medium tracking-wide">Xin chờ trong giây lát. Hệ thống đang trích xuất giải pháp...</p>
      </div>

      <div className="w-56 h-2 bg-slate-200/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm relative">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent_75%,transparent_100%)] bg-[length:1rem_1rem] animate-[move_1s_linear_infinite]" />
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes move {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      `}} />
    </div>
  );
}
