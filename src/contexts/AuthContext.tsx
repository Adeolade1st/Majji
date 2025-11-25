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


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = useSession();

  // Sync session with user state
  useEffect(() => {
    if (session?.user) {
      // Map session user to our User interface
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || '',
        type: session.user.type as 'seller' | 'buyer' | undefined,
        company: session.user.company,
        verified: session.user.verified || session.user.emailVerified || false,
        joinedDate: session.user.createdAt ? new Date(session.user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        needsOnboarding: session.user.needsOnboarding ?? true
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email: string, password: string, type?: 'seller' | 'buyer') => {
    setIsLoading(true);
    
    try {
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
      await authSignIn.social({
        provider: 'google',
        callbackURL: `${window.location.origin}/dashboard`
      });
    } catch (error) {
      setIsLoading(false);
      throw new Error('Google authentication failed. Please check your configuration.');
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
        type,
        company: company || '',
        needsOnboarding: true,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    
    setIsLoading(false);
  };

  const completeOnboarding = async (data: { name: string; type: 'seller' | 'buyer'; company?: string }) => {
    setIsLoading(true);
    
    try {
      // Update user profile via API call to better-auth
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          needsOnboarding: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
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