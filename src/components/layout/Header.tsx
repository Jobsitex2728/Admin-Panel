import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import type { RootState } from '@/store'
import { getInitials } from '@/lib/utils'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'User Management',
  '/drivers': 'Driver Management',
  '/jobs': 'Jobs Management',
  '/truck-types': 'Truck Types',
  '/withdrawals': 'Withdrawals',
  '/cms': 'CMS Pages',
}

export function Header() {
  const user = useSelector((s: RootState) => s.auth.user)
  const location = useLocation()

  const title = Object.entries(pageTitles).find(
    ([path]) => location.pathname === path || location.pathname.startsWith(path + '/'),
  )?.[1] ?? 'Admin'

  return (
    <header className="fixed top-0 right-0 left-64 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="JobsiteX" className="h-8 w-auto shrink-0" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-400">Welcome back, {user?.fullName?.split(' ')[0] ?? 'Admin'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-900">{user?.fullName ?? 'Admin'}</p>
          <p className="text-xs text-slate-400">{user?.email ?? ''}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold cursor-pointer select-none">
          {user ? getInitials(user.fullName) : 'AD'}
        </div>
      </div>
    </header>
  )
}
