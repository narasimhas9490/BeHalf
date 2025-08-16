import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LandingPage } from './components/LandingPage';
import { LoginForm } from './components/LoginForm';
import { SonSignup } from './components/SonSignup';
import { DoctorSignup } from './components/DoctorSignup';
import { ParentSignup } from './components/ParentSignup';
import { SonApp } from './components/SonApp';
import { ParentApp } from './components/ParentApp';
import { DoctorApp } from './components/DoctorApp';
import { CaretakerApp } from './components/CaretakerApp';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();
  const [authState, setAuthState] = useState<{
    mode: 'landing' | 'login' | 'signup';
    userType: string;
  }>({
    mode: 'landing',
    userType: ''
  });

  const handleAuthSelection = (mode: 'login' | 'signup', userType: string) => {
    setAuthState({ mode, userType });
  };

  const handleAuthSuccess = () => {
    setAuthState({ mode: 'landing', userType: '' });
  };

  const handleBack = () => {
    setAuthState({ mode: 'landing', userType: '' });
  };

  const handleLogout = () => {
    logout();
    setAuthState({ mode: 'landing', userType: '' });
  };

  const switchToSignup = () => {
    setAuthState(prev => ({ ...prev, mode: 'signup' }));
  };

  const switchToLogin = () => {
    setAuthState(prev => ({ ...prev, mode: 'login' }));
  };

  // Show pending approval for doctors
  if (isAuthenticated && user?.userType === 'doctor' && !user.isApproved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Application Under Review</h2>
              <p className="text-gray-600 mb-4">
                Thank you for registering, Dr. {user.name}. Your application and certificates are being reviewed by our medical board.
              </p>
              <Badge variant="outline" className="mb-4">
                Expected Review Time: 2-3 Business Days
              </Badge>
              <p className="text-sm text-gray-500 mb-6">
                You'll receive an email notification once your account is approved and you can start providing care through our platform.
              </p>
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Route to appropriate app based on authenticated user
  if (isAuthenticated && user) {
    switch (user.userType) {
      case 'son':
        return <SonApp onBack={handleLogout} />;
      case 'parent':
        return <ParentApp onBack={handleLogout} />;
      case 'doctor':
        return <DoctorApp onBack={handleLogout} />;
      case 'caretaker':
        return <CaretakerApp onBack={handleLogout} />;
      default:
        return <LandingPage onSelectAuth={handleAuthSelection} />;
    }
  }

  // Authentication flow
  if (authState.mode === 'login') {
    return (
      <LoginForm
        userType={authState.userType}
        onBack={handleBack}
        onSuccess={handleAuthSuccess}
        onSwitchToSignup={switchToSignup}
      />
    );
  }

  if (authState.mode === 'signup') {
    switch (authState.userType) {
      case 'son':
        return <SonSignup onBack={handleBack} onSuccess={handleAuthSuccess} />;
      case 'doctor':
        return <DoctorSignup onBack={handleBack} onSuccess={handleAuthSuccess} />;
      case 'parent':
        return <ParentSignup onBack={handleBack} onSuccess={handleAuthSuccess} />;
      case 'caretaker':
        // For now, caretakers use the standard parent signup flow
        return <ParentSignup onBack={handleBack} onSuccess={handleAuthSuccess} />;
      default:
        return <LandingPage onSelectAuth={handleAuthSelection} />;
    }
  }

  // Default landing page
  return <LandingPage onSelectAuth={handleAuthSelection} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}