import { MapPin, School, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthorProfile() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="clay-card p-5 relative overflow-hidden"
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-400 to-emerald-500 rounded-t-[24px]"></div>

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-blue-200"
                        style={{ boxShadow: '5px 5px 10px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.7)' }}>
                        <img
                            src="/GV/avatar.jpg"
                            alt="Trần Thị Kim Thoa"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=T+K+T&background=2563EB&color=fff&size=80';
                            }}
                        />
                    </div>
                    {/* Mini logo */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-2 border-slate-200 overflow-hidden"
                        style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                        <img src="/GV/logo.jpg" alt="Logo" className="w-full h-full object-contain p-0.5"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="clay-badge bg-blue-50 text-blue-600 border-blue-200 mb-1.5">
                        <User size={12} />
                        Tác giả
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-800 leading-tight truncate">Trần Thị Kim Thoa</h2>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                        <School size={14} className="text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-semibold truncate">THPT Hoàng Diệu</span>
                    </div>
                    <div className="flex items-start gap-1.5 mt-1 text-slate-400">
                        <MapPin size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs leading-tight">Phú Lợi, Cần Thơ</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
