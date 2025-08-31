import React, { useState } from 'react';
import { User } from '../contexts/AuthContext';
import { Download, Star, Clock, CreditCard, MessageCircle, Shield, Eye } from 'lucide-react';

interface BuyerDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('purchases');

  const purchases = [
    { 
      id: 1, 
      name: 'React Dashboard Pro', 
      seller: 'Sarah Johnson',
      price: 299, 
      date: '2024-01-15',
      license: 'Standard',
      status: 'completed',
      downloadCount: 3
    },
    { 
      id: 2, 
      name: 'Vue Component Library', 
      seller: 'Maria Garcia',
      price: 129, 
      date: '2024-01-10',
      license: 'Extended',
      status: 'completed',
      downloadCount: 1
    },
    { 
      id: 3, 
      name: 'Mobile Banking App UI', 
      seller: 'Alex Rodriguez',
      price: 199, 
      date: '2024-01-05',
      license: 'Standard',
      status: 'processing',
      downloadCount: 0
    }
  ];

  const tabs = [
    { id: 'purchases', label: 'My Purchases' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'reviews', label: 'My Reviews' },
    { id: 'messages', label: 'Messages' },
    { id: 'billing', label: 'Billing' }
  ];

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Manage your purchases and downloads.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${totalSpent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products Owned</p>
              <p className="text-2xl font-bold text-gray-900">{purchases.filter(p => p.status === 'completed').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reviews Written</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'purchases' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Purchase History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{purchase.name}</h4>
                      <p className="text-sm text-gray-500">by {purchase.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${purchase.price}</p>
                      <p className="text-sm text-gray-500">{purchase.license} License</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{purchase.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{purchase.downloadCount} downloads</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        purchase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        purchase.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {purchase.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {purchase.status === 'completed' && (
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors btn-animate">
                          Download
                        </button>
                      )}
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'downloads' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Download Center</h3>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {purchases.filter(p => p.status === 'completed').map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-900">{purchase.name}</h4>
                    <p className="text-sm text-gray-500">Downloaded {purchase.downloadCount} times</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{purchase.license} License</p>
                      <p className="text-xs text-gray-500">Purchased {purchase.date}</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors btn-animate flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">My Reviews</h3>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {purchases.filter(p => p.status === 'completed').map((purchase) => (
                <div key={purchase.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{purchase.name}</h4>
                      <p className="text-sm text-gray-500">by {purchase.seller}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">Excellent product with clean code and great documentation. Saved me a lot of development time!</p>
                  <p className="text-xs text-gray-500">Reviewed on {purchase.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Billing & Payment Methods</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Primary</span>
                </div>
                <button className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  + Add Payment Method
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Invoice History</h4>
              <div className="space-y-3">
                {purchases.map((purchase, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">#{purchase.id.toString().padStart(6, '0')}</p>
                      <p className="text-sm text-gray-500">{purchase.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${purchase.price}</p>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;