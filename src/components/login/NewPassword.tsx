import { CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

const NewPasswordStep: React.FC<{
    newPassword: string;
    setNewPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onBack: () => void;
    loading: boolean;
}> = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, onSubmit, onBack, loading }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const requirements = [
        { label: 'At least 8 characters', met: newPassword.length >= 8 },
        { label: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
        { label: 'One number', met: /[0-9]/.test(newPassword) }
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Set New Password</h3>
            <p className="text-white/60 text-sm mb-4">
                Create a strong password for your account
            </p>

            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            {newPassword && (
                <div className="space-y-2 text-sm">
                    <p className="text-white/60">Password requirements:</p>
                    <ul className="space-y-1">
                        {requirements.map((req, index) => (
                            <li key={index} className={`flex items-center gap-2 ${req.met ? 'text-green-400' : 'text-white/40'}`}>
                                <CheckCircle className="w-4 h-4" />
                                <span>{req.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-lg text-white/60 hover:text-white/80 hover:border-white/20 transition"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </div>
        </form>
    );
};

export default NewPasswordStep;