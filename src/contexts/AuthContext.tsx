import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from '../lib/auth-client';

export interface User {
  id: string;
  email: string;
  name: string;
  type?: 'seller' | 'buyer';
  avatar?: string;
  company?: string;
  verified: boolean;
  rating?: number;
  totalSales?: number;
  joinedDate: string;
  needsOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type?: 'seller' | 'buyer') => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, type: 'seller' | 'buyer', company?: string) => Promise<void>;
  completeOnboarding: (data: { name: string; type: 'seller' | 'buyer'; company?: string }) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo (in real app, this would come from your backend)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.dev@email.com',
    name: 'Sarah Johnson',
    type: 'seller',
    verified: true,
    rating: 4.8,
    totalSales: 127,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    email: 'buyer@company.com',
    name: 'Mike Chen',
    type: 'buyer',
    company: 'TechCorp Inc.',
    verified: true,
    joinedDate: '2023-06-20'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();

  // Sync session with user state
  useEffect(() => {
    if (session?.user) {
      // Check if this is a returning user or needs onboarding
      const existingUser = mockUsers.find(u => u.email === session.user.email);
      
      if (existingUser) {
        setUser(existingUser);
      } else {
        // New user from Google OAuth - needs onboarding
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || '',
          verified: session.user.emailVerified || false,
          joinedDate: new Date().toISOString().split('T')[0],
          needsOnboarding: true
        });
      }
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string, password: string, type?: 'seller' | 'buyer') => {
    setIsLoading(true);
    
    try {
      // For demo purposes, check mock users first
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        setIsLoading(false);
        return;
      }

      // Use better-auth for actual authentication
      const result = await authSignIn.email({
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      const result = await authSignIn.social({
        provider: 'google',
        callbackURL: '/dashboard'
      });

      if (result.error) {
        throw new Error(result.error.message || 'Google login failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, type: 'seller' | 'buyer', company?: string) => {
    setIsLoading(true);
    
    try {
      const result = await authSignUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }

      // Set user with onboarding needed
      setUser({
        id: Date.now().toString(),
        email,
        name,
        type,
        company,
        verified: false,
        joinedDate: new Date().toISOString().split('T')[0],
        needsOnboarding: true
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    
    setIsLoading(false);
  };

  const completeOnboarding = async (data: { name: string; type: 'seller' | 'buyer'; company?: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser: User = {
          ...user,
          name: data.name,
          type: data.type,
          company: data.company,
          needsOnboarding: false
        };
        setUser(updatedUser);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authSignOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginWithGoogle,
      register, 
      completeOnboarding,
      logout, 
      isLoading: isLoading || isPending 
    }}>
      {children}
    </AuthContext.Provider>
  );
};