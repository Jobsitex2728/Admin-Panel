import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { Toaster } from 'sonner'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import LoginPage from '@/pages/Login'
import DashboardPage from '@/pages/Dashboard'
import UsersPage from '@/pages/UserManagement'
import DriversPage from '@/pages/DriverManagement'
import DriverDetailPage from '@/pages/DriverProfile'
import JobsPage from '@/pages/JobsManagement'
import TruckTypesPage from '@/pages/TruckTypes'
import WithdrawalsPage from '@/pages/Withdrawals'
import CmsPagesPage from '@/pages/CmsPages'
import ForgotPasswordPage from '@/pages/ForgotPassword'
import NotFoundPage from '@/pages/NotFound'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/users', element: <UsersPage /> },
          { path: '/drivers', element: <DriversPage /> },
          { path: '/drivers/:id', element: <DriverDetailPage /> },
          { path: '/jobs', element: <JobsPage /> },
          { path: '/truck-types', element: <TruckTypesPage /> },
          { path: '/withdrawals', element: <WithdrawalsPage /> },
          { path: '/cms', element: <CmsPagesPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  )
}
