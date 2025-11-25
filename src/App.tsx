import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import AddProductPage from './pages/AddProductPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import './App.css';

type Page = 'home' | 'browse' | 'product' | 'dashboard' | 'auth' | 'onboarding' | 'add-product';

interface NavigationOptions {
  page: Page;
  productId?: string;
  searchTerm?: string;
}
function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const { user } = useAuth();

  // Handle automatic navigation for users needing onboarding
  React.useEffect(() => {
    if (user?.needsOnboarding && currentPage !== 'onboarding') {
      setCurrentPage('onboarding');
    }
  }, [user, currentPage]);

  const handleNavigate = (options: NavigationOptions | Page) => {
    if (typeof options === 'string') {
      // Legacy string navigation
      setCurrentPage(options);
      setSelectedProductId(null);
      setCurrentSearchTerm('');
    } else {
      // New object navigation
      setCurrentPage(options.page);
      setSelectedProductId(options.productId || null);
      setCurrentSearchTerm(options.searchTerm || '');
    }
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onProductSelect={navigateToProduct} />;
      case 'browse':
        return <BrowsePage onNavigate={handleNavigate} onProductSelect={navigateToProduct} initialSearchTerm={currentSearchTerm} />;
      case 'product':
        return <ProductPage productId={selectedProductId} onNavigate={handleNavigate} />;
      case 'dashboard':
        return user ? <DashboardPage onNavigate={handleNavigate} /> : <AuthPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'onboarding':
        return <OnboardingPage onNavigate={handleNavigate} />;
      case 'add-product':
        return user ? <AddProductPage onNavigate={handleNavigate} /> : <AuthPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onProductSelect={navigateToProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;