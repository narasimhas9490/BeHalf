import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LanguageProvider } from './components/LanguageContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { SonApp } from './components/SonApp';
import { ParentApp } from './components/ParentApp';
import { DoctorApp } from './components/DoctorApp';
import { CaretakerApp } from './components/CaretakerApp';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { AlertCircle } from 'lucide-react';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show pending approval for doctors
  if (user?.userType === 'doctor' && !user.isApproved) {
    return <DoctorPendingApproval />;
  }

  return <>{children}</>;
}

// Doctor Pending Approval Component
function DoctorPendingApproval() {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="w-full max-w-md mx-auto pt-20">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Application Under Review</h2>
            <p className="text-gray-600 mb-4">
              Thank you for registering, Dr. {user?.name}. Your application and certificates are being reviewed by our medical board.
            </p>
            <Badge variant="outline" className="mb-4">
              Expected Review Time: 2-3 Business Days
            </Badge>
            <p className="text-sm text-gray-500 mb-6">
              You'll receive an email notification once your account is approved and you can start providing care through our platform.
            </p>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dashboard Route Component
function DashboardRoute() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.userType) {
    case 'son':
      return <SonApp />;
    case 'parent':
      return <ParentApp />;
    case 'doctor':
      return <DoctorApp />;
    case 'caretaker':
      return <CaretakerApp />;
    default:
      return <Navigate to="/" replace />;
  }
}

// Redirect authenticated users from auth pages
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes (redirect if already authenticated) */}
      <Route path="/login" element={
        <AuthRoute>
          <Login />
        </AuthRoute>
      } />
      <Route path="/signup" element={
        <AuthRoute>
          <Signup />
        </AuthRoute>
      } />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <DashboardRoute />
        </ProtectedRoute>
      } />
      
      {/* Legacy route redirects */}
      <Route path="/qrcode" element={<Navigate to="/dashboard/qrcode" replace />} />
      <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
      <Route path="/records" element={<Navigate to="/dashboard/records" replace />} />
      <Route path="/appointments" element={<Navigate to="/dashboard/appointments" replace />} />
      <Route path="/medications" element={<Navigate to="/dashboard/medications" replace />} />
      <Route path="/billing" element={<Navigate to="/dashboard/billing" replace />} />
      <Route path="/visits" element={<Navigate to="/dashboard/visits" replace />} />
      <Route path="/patients" element={<Navigate to="/dashboard/patients" replace />} />
      <Route path="/routes" element={<Navigate to="/dashboard/routes" replace />} />
      <Route path="/scanner" element={<Navigate to="/dashboard/scanner" replace />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}