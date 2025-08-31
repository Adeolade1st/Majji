import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'seller' | 'buyer';
  avatar?: string;
  company?: string;
  verified: boolean;
  rating?: number;
  totalSales?: number;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'seller' | 'buyer') => Promise<void>;
  register: (email: string, password: string, name: string, type: 'seller' | 'buyer', company?: string) => Promise<void>;
  logout: () => void;
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

// Mock users for demo
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

  const login = async (email: string, password: string, type: 'seller' | 'buyer') => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.type === type);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, type: 'seller' | 'buyer', company?: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      type,
      company,
      verified: false,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};