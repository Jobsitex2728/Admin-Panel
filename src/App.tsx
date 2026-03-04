import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement';
import MainLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Login';
import JobsManagement from './pages/JobsManagement';
import DriverManagement from './pages/DriverManagement';
import DriverProfile from './pages/DriverProfile';
import DriverDocuments from './pages/DriverDocuments';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<div>Signup</div>} />

            {/* Protected routes with MainLayout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/jobs" element={<JobsManagement />} />
                <Route path="/drivers" element={<DriverManagement />} />
                <Route path="/drivers/:driverId" element={<DriverProfile />} />
                <Route path="/drivers/:driverId/documents" element={<DriverDocuments />} />
              </Route>
            </Route>

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;