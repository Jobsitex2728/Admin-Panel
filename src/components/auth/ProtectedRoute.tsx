import { Navigate, Outlet } from 'react-router-dom';

// This is a simple mock - replace with real auth later
const isAuthenticated = true; // Mock authentication

export default function ProtectedRoute() {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}