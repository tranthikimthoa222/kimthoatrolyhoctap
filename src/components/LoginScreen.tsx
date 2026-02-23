import React, { useState } from 'react';
import { BookOpen, LogIn, User, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
    onLogin: () => void;
}

const VALID_USER = 'Trần Thị Kim Thoa';
const VALID_PASS = '12345';

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
            triggerShake();
            return;
        }

        if (username.trim() === VALID_USER && password === VALID_PASS) {
            localStorage.setItem('tro_ly_logged_in', 'true');
            localStorage.setItem('tro_ly_user', username.trim());
            onLogin();
        } else {
            setError('Tài khoản hoặc mật khẩu không đúng.');
            triggerShake();
        }
    };

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    return (
        <div className="min-h-screen edu-bg flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                {/* Logo & Title */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-block"
                    >
                        <div className="clay-card !rounded-full p-5 inline-flex mx-auto"
                            style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                            <BookOpen size={40} className="text-white" strokeWidth={2} />
                        </div>
                    </motion.div>
                    <h1 className="text-2xl font-extrabold text-slate-800 mt-4">Trợ Lý AI Học Tập</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Đăng nhập để tiếp tục</p>
                </div>

                {/* Login Card */}
                <motion.form
                    onSubmit={handleSubmit}
                    animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="clay-card p-6 space-y-5"
                >
                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl border-2 border-red-100"
                        >
                            <AlertCircle size={18} className="flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Tài khoản</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tên tài khoản"
                                className="w-full pl-11 pr-4 clay-input"
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Mật khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className="w-full pl-11 pr-4 clay-input"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="clay-btn clay-btn-primary w-full flex items-center justify-center gap-2 text-base cursor-pointer !mt-6"
                    >
                        <LogIn size={20} />
                        <span>Đăng Nhập</span>
                    </button>
                </motion.form>

                {/* Footer */}
                <p className="text-center text-xs text-slate-400 font-medium mt-6">
                    THPT Hoàng Diệu • Cần Thơ
                </p>
            </motion.div>
        </div>
    );
}
