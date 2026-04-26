import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import type { RootState } from '@/store'

export function ProtectedRoute() {
  const accessToken = useSelector((s: RootState) => s.auth.accessToken)
  if (!accessToken) return <Navigate to="/login" replace />
  return <Outlet />
}
