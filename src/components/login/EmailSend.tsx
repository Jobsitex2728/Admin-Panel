import { Mail } from "lucide-react";

const EmailStep: React.FC<{
  email: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  onClose: () => void;
}> = ({ email, setEmail, onSubmit, loading }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <h3 className="text-xl font-bold text-white mb-4">Reset Password</h3>
    <p className="text-white/60 text-sm mb-4">
      Enter your email address and we'll send you an OTP to reset your password.
    </p>
    
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
        required
      />
    </div>
    
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
    >
      {loading ? 'Sending...' : 'Send OTP'}
    </button>
  </form>
);

export default EmailStep;