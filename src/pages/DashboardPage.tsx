import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SellerDashboard from '../components/SellerDashboard';
import BuyerDashboard from '../components/BuyerDashboard';

interface NavigationOptions {
  page: string;
  productId?: string;
  searchTerm?: string;
}

interface DashboardPageProps {
  onNavigate: (options: NavigationOptions | string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h2>
          <button
            onClick={() => onNavigate('auth')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.type === 'seller' ? (
        <SellerDashboard user={user} onNavigate={onNavigate} />
      ) : (
        <BuyerDashboard user={user} onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default DashboardPage;