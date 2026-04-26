import { NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  LayoutDashboard, Users, Truck, Briefcase,
  Wallet, FileText, LogOut, ChevronRight,
} from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { logout } from '@/store/authSlice'
import type { RootState } from '@/store'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/drivers', icon: Truck, label: 'Drivers' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/truck-types', icon: TruckIcon, label: 'Truck Types' },
  { to: '/withdrawals', icon: Wallet, label: 'Withdrawals' },
  { to: '/cms', icon: FileText, label: 'CMS Pages' },
]

export function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((s: RootState) => s.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    void navigate('/login')
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-800">
        <img src="/logo.png" alt="JobsiteX" className="h-8 w-auto shrink-0" />
        <div>
          <span className="text-base font-bold text-white">JobsiteX</span>
          <p className="text-[10px] text-slate-400 -mt-0.5 uppercase tracking-wider">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Navigation</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mb-0.5',
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              )
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="h-3 w-3" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
            {user ? getInitials(user.fullName) : 'AD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.fullName ?? 'Admin'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email ?? ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
