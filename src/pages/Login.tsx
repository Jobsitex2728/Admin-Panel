import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff, TruckIcon, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '@/store/api/authApi'
import { setCredentials } from '@/store/authSlice'
import { toast } from 'sonner'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: typeof errors = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }))
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Invalid credentials'
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between bg-slate-950 p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-400/5 blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/25">
            <TruckIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">JobsiteX</span>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider -mt-0.5">Admin Console</p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">Admin Dashboard</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Manage your<br />
              <span className="text-emerald-400">trucking platform</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Full control over drivers, jobs, users, and platform settings — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Drivers', desc: 'Approve & manage' },
              { label: 'Jobs', desc: 'Monitor all jobs' },
              { label: 'Payments', desc: 'Track revenue' },
              { label: 'Users', desc: 'Block & manage' },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-slate-600">
          JobsiteX © {new Date().getFullYear()} — Secure Admin Access
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500">
              <TruckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">JobsiteX Admin</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
              <p className="text-slate-500 text-sm mt-1">Enter your admin credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@jobsitex.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
                    className="pl-9 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full gap-2" loading={isLoading}>
                Sign in
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            Restricted access — authorised personnel only
          </p>
        </div>
      </div>
    </div>
  )
}
