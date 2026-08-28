import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import LoginModal from './components/LoginModal';
import { useAuth } from './context/AuthContext';

// Route guard: only allows access if user has an active subscription
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading, hasActiveSubscription, profile } = useAuth();

  // Show nothing while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Not logged in → go to landing
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Logged in but no active subscription AND not the admin test account
  // Allow brandondevnunez@gmail.com (and common typo) to always access (Pro test account)
  const isAdminTestAccount = profile?.email === 'brandondevnunez@gmail.com' || profile?.email === 'brandodevnunez@gmail.com';
  if (!hasActiveSubscription && !isAdminTestAccount && !profile?.is_pro) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <LoginModal />
    </>
  );
}
