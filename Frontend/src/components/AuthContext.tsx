import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  userType: 'son' | 'parent' | 'doctor' | 'caretaker';
  name: string;
  plan?: 'basic' | 'premium' | 'platinum';
  isApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: string) => Promise<boolean>;
  signup: (userData: any, userType: string, plan?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on type
      const mockUser: User = {
        id: `${userType}_${Date.now()}`,
        email,
        userType: userType as any,
        name: email.split('@')[0],
        plan: userType === 'son' ? 'premium' : undefined,
        isApproved: userType === 'doctor' ? true : undefined
      };

      setUser(mockUser);
      localStorage.setItem('behalf_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (userData: any, userType: string, plan?: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: `${userType}_${Date.now()}`,
        email: userData.email,
        userType: userType as any,
        name: userData.name || userData.email.split('@')[0],
        plan: plan as any,
        isApproved: userType === 'doctor' ? false : undefined // Doctors need approval
      };

      setUser(newUser);
      localStorage.setItem('behalf_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('behalf_user');
  };

  // Check for existing session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('behalf_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('behalf_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}