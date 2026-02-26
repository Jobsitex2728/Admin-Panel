// pages/LoginPage.tsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import ForgotPasswordModal from '../components/login/forgot-password';

const LoginPage = () => {
    const [email, setEmail] = useState('demo@gmail.com');
    const [password, setPassword] = useState('********');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log('Login with:', { email, password, rememberMe });
            await new Promise(resolve => setTimeout(resolve, 1500));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/bg-image.png')` }}
            >
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    <div className="text-center mb-2 relative flex flex-col items-center justify-center">
                        <div className='bg-green-500 w-20 h-20 blur-2xl absolute -z-10'></div>
                        <img src={'/logo.png'} alt="JOBSITE" className="h-45 mx-auto mb-4" />
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-white/60">Let's login into your account first</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-green-600 accent-green-500 focus:ring-green-500/40"
                                    />
                                    <span className="text-white/60 group-hover:text-white/80 transition">Remember Me</span>
                                </label>

                                <button
                                    onClick={() => setShowForgotModal(true)}
                                    className="text-green-500 hover:text-green-400 transition font-medium"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-white/60">
                                    Don't have an account? Contact Your Developer.
                                </p>
                            </div>

                            <div className="text-center mt-8 text-white/40 text-sm">
                                <p>© 2026 JOBSITEX. All rights reserved.</p>
                                <button className="hover:text-white/60 transition mt-1">
                                    Term & Condition
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <ForgotPasswordModal
                isOpen={showForgotModal}
                onClose={() => setShowForgotModal(false)}
                initialEmail={email}
            />
        </div>
    );
};

export default LoginPage;