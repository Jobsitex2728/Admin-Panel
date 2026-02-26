// OTP Step Component
const OtpStep: React.FC<{
  email: string;
  otp: string[];
  setOtp: (otp: string[]) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBack: () => void;
  onResend: () => Promise<void>;
  loading: boolean;
}> = ({ email, otp, setOtp, onSubmit, onBack, onResend, loading }) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-2">Verify OTP</h3>
      <p className="text-white/60 text-sm mb-4">
        Enter the code sent to <span className="text-white font-medium">{email}</span>
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs!.current[index]! = el!)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center bg-white/5 border border-white/10 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            required
          />
        ))}
      </div>

      <div className="flex gap-3">
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
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
};

export default OtpStep;