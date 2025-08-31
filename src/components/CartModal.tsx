import React from 'react';
import { X, Trash2, Download, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    // Simulate purchase and clear cart
    alert('Purchase successful! Check your dashboard for downloads.');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 modal-backdrop">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-gray-400 mb-2">
                  <Download className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some products to get started</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.licenseType}</p>
                      <p className="text-sm font-semibold text-indigo-600">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-indigo-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors btn-animate"
                >
                  Secure Checkout
                </button>
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <Shield className="h-3 w-3" />
                  <span>256-bit SSL encryption</span>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;