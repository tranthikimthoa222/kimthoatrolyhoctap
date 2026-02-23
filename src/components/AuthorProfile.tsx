import { MapPin, School, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthorProfile() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-lg p-6 sm:p-8 border border-white/60 relative overflow-hidden group mb-8"
        >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-green-500 opacity-80 z-20"></div>

            {/* Decorative background gradients */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-400/20 transition-colors duration-500"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/20 transition-colors duration-500"></div>

            {/* Logo watermark */}
            <div className="absolute bottom-4 right-4 opacity-[0.03] pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-700">
                <img src="/GV/logo.jpg" alt="Logo Watermark" className="w-32 h-32 object-contain" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">

                {/* Avatar Section */}
                <div className="relative flex-shrink-0 group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur opacity-40 group-hover/avatar:opacity-60 group-hover/avatar:scale-110 transition-all duration-300"></div>
                    <div className="relative w-32 h-32 md:w-40 md:w-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-50 flex items-center justify-center p-1">
                        <img
                            src="/GV/avatar.jpg"
                            alt="Trần Thị Kim Thoa"
                            className="w-full h-full object-cover rounded-full group-hover/avatar:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Tran+Thi+Kim+Thoa&background=0D8ABC&color=fff';
                            }}
                        />
                    </div>

                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full p-1 shadow-lg">
                        <img
                            src="/GV/logo.jpg"
                            alt="THPT Hoàng Diệu Logo"
                            className="w-full h-full object-contain rounded-full border border-slate-100"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2 border border-teal-100">
                            <User size={14} />
                            Tác giả
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Trần Thị Kim Thoa
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full mt-3 mx-auto md:mx-0"></div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3 text-slate-600 sm:justify-center md:justify-start">
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-teal-600 shadow-sm shrink-0">
                                <School size={20} />
                            </div>
                            <p className="font-semibold text-[15px] pt-1.5">Trường THPT Hoàng Diệu</p>
                        </div>

                        <div className="flex items-start gap-3 text-slate-600 sm:justify-center md:justify-start">
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-emerald-600 shadow-sm shrink-0">
                                <MapPin size={20} />
                            </div>
                            <p className="text-[14px] leading-relaxed max-w-sm pt-1">
                                Số 1 Mạc Đĩnh Chi, phường Phú Lợi, thành phố Cần Thơ
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
