import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-black text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">Page not found</h1>
        <p className="text-slate-500 mt-1 mb-6">The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    </div>
  )
}
