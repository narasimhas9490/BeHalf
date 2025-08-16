import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from './AuthContext';
import { ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  userType: string;
  onBack: () => void;
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export function LoginForm({ userType, onBack, onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(formData.email, formData.password, userType);
      if (success) {
        onSuccess();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'son': return 'Family Member';
      case 'parent': return 'Patient';
      case 'doctor': return 'Doctor';
      case 'caretaker': return 'Caretaker';
      default: return 'User';
    }
  };

  const getUserTypeDescription = () => {
    switch (userType) {
      case 'son': return 'Manage care for your parents';
      case 'parent': return 'View your health status and appointments';
      case 'doctor': return 'Provide professional healthcare services';
      case 'caretaker': return 'Conduct home visits and care services';
      default: return 'Access your dashboard';
    }
  };

  const getBadgeColor = () => {
    switch (userType) {
      case 'son': return 'bg-blue-100 text-blue-800';
      case 'parent': return 'bg-green-100 text-green-800';
      case 'doctor': return 'bg-purple-100 text-purple-800';
      case 'caretaker': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <Badge className={`w-fit mx-auto mb-4 ${getBadgeColor()}`}>
              {getUserTypeLabel()} Login
            </Badge>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600">{getUserTypeDescription()}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Button variant="link" className="px-0 text-sm">
                Forgot password?
              </Button>
            </div>

            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Button 
                variant="link" 
                className="px-0"
                onClick={onSwitchToSignup}
              >
                Sign up
              </Button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500 text-center">
                Email: demo@behalf.com<br />
                Password: demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}