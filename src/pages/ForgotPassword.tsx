import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { Mail, Lock, KeyRound, ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/store/api/authApi'
import { toast } from 'sonner'

type Step = 'email' | 'reset' | 'done'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading: sending }] = useForgotPasswordMutation()
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation()

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setErrors({ email: 'Email is required' })
    if (!/\S+@\S+\.\S+/.test(email)) return setErrors({ email: 'Enter a valid email' })
    setErrors({})
    try {
      await forgotPassword({ email }).unwrap()
      toast.success('OTP sent — check your email')
      setStep('reset')
    } catch {
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const e2: Record<string, string> = {}
    if (!code || code.length !== 6) e2.code = 'Enter the 6-digit code'
    if (!newPassword || newPassword.length < 8) e2.newPassword = 'Password must be at least 8 characters'
    if (newPassword !== confirmPassword) e2.confirmPassword = 'Passwords do not match'
    if (Object.keys(e2).length) return setErrors(e2)
    setErrors({})
    try {
      await resetPassword({ email, code, newPassword }).unwrap()
      setStep('done')
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Invalid or expired OTP'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="flex items-center gap-2.5 mb-6">
          <img src="/logo.png" alt="JobsiteX" className="h-8 w-auto" />
          <span className="text-base font-bold text-slate-900">JobsiteX</span>
        </div>

        {step !== 'done' && (
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          {/* Step: email */}
          {step === 'email' && (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 mb-5">
                <Mail className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Forgot password?</h1>
              <p className="text-sm text-slate-500 mt-1 mb-6">
                Enter your admin email and we'll send a 6-digit code to reset your password.
              </p>
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@jobsitex.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors({}) }}
                      className="pl-9"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <Button type="submit" className="w-full gap-2" loading={sending}>
                  Send OTP
                  {!sending && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            </>
          )}

          {/* Step: reset */}
          {step === 'reset' && (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 mb-5">
                <KeyRound className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Reset password</h1>
              <p className="text-sm text-slate-500 mt-1 mb-1">
                A 6-digit code was sent to
              </p>
              <p className="text-sm font-medium text-slate-900 mb-6">{email}</p>

              <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="code">OTP Code</Label>
                  <Input
                    id="code"
                    placeholder="123456"
                    value={code}
                    onChange={e => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setErrors(p => ({ ...p, code: '' })) }}
                    className="text-center tracking-[0.4em] text-lg font-mono"
                    maxLength={6}
                  />
                  {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="newPassword">New password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: '' })) }}
                      className="pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })) }}
                      className="pl-9"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex gap-3 pt-1">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('email')}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="flex-1" loading={resetting}>
                    Reset Password
                  </Button>
                </div>
              </form>

              <button
                type="button"
                className="mt-4 w-full text-xs text-slate-400 hover:text-emerald-600 transition-colors"
                onClick={handleSendOtp}
                disabled={sending}
              >
                Didn't receive the code? Resend OTP
              </button>
            </>
          )}

          {/* Step: done */}
          {step === 'done' && (
            <div className="text-center py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mx-auto mb-5">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Password reset!</h1>
              <p className="text-sm text-slate-500 mt-2 mb-8">
                Your password has been updated. You can now sign in with your new credentials.
              </p>
              <Button className="w-full" onClick={() => navigate('/login')}>
                Go to sign in
              </Button>
            </div>
          )}

        </div>

        {step === 'email' && (
          <p className="text-center text-xs text-slate-400 mt-5">
            Restricted access — authorised personnel only
          </p>
        )}
      </div>
    </div>
  )
}
