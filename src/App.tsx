import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import AddProductPage from './pages/AddProductPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import './App.css';

type Page = 'home' | 'browse' | 'product' | 'dashboard' | 'auth' | 'add-product';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { user } = useAuth();

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onProductSelect={navigateToProduct} />;
      case 'browse':
        return <BrowsePage onNavigate={setCurrentPage} onProductSelect={navigateToProduct} />;
      case 'product':
        return <ProductPage productId={selectedProductId} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <DashboardPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'add-product':
        return user ? <AddProductPage onNavigate={setCurrentPage} /> : <AuthPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} onProductSelect={navigateToProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
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