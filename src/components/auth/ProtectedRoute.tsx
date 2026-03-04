import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = true;

export default function ProtectedRoute() {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}