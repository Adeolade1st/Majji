import React, { useState } from 'react';
import { User } from '../contexts/AuthContext';
import { TrendingUp, DollarSign, Eye, Users, Plus, Edit3, BarChart3, Download, Star, MessageCircle } from 'lucide-react';

interface NavigationOptions {
  page: string;
  productId?: string;
  searchTerm?: string;
}

interface SellerDashboardProps {
  user: User;
  onNavigate: (options: NavigationOptions | string) => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Products Sold', value: '147', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Views', value: '8,923', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Active Products', value: '12', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const products = [
    { id: 1, name: 'React Dashboard Pro', price: 299, sales: 45, revenue: 13455, rating: 4.9 },
    { id: 2, name: 'Vue Component Library', price: 129, sales: 32, revenue: 4128, rating: 4.7 },
    { id: 3, name: 'API Analytics Tool', price: 79, sales: 28, revenue: 2212, rating: 4.6 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'My Products' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'messages', label: 'Messages' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Here's your business overview.</p>
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

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
              <div className="space-y-3">
                {[
                  { product: 'React Dashboard Pro', buyer: 'John D.', amount: 299, date: '2 hours ago' },
                  { product: 'Vue Component Library', buyer: 'Sarah K.', amount: 129, date: '5 hours ago' },
                  { product: 'API Analytics Tool', buyer: 'Mike R.', amount: 79, date: '1 day ago' }
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{sale.product}</p>
                      <p className="text-sm text-gray-500">Sold to {sale.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${sale.amount}</p>
                      <p className="text-xs text-gray-500">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold text-gray-900">3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Support Tickets</span>
                  <span className="font-semibold text-gray-900">2 open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">My Products</h3>
            <button 
              onClick={() => onNavigate('add-product')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 btn-animate"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 text-gray-900">{product.sales}</td>
                      <td className="px-6 py-4 font-semibold text-green-600">${product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-900">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Analytics & Insights</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                <span>Sales Trend</span>
              </h4>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would be here</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h4>
              <div className="space-y-3">
                {products.slice(0, 3).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.sales} sales</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Earnings Overview</h3>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">$12,450</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">$10,582</div>
                <div className="text-sm text-gray-600">Available for Payout</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">$1,868</div>
                <div className="text-sm text-gray-600">Platform Fees (15%)</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors btn-animate">
                Request Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Messages & Support</h3>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {[
                { from: 'John Smith', subject: 'Question about React Dashboard Pro', time: '2 hours ago', unread: true },
                { from: 'Lisa Johnson', subject: 'Feature request for Vue Library', time: '1 day ago', unread: false },
                { from: 'Mike Chen', subject: 'Installation help needed', time: '3 days ago', unread: false }
              ].map((message, index) => (
                <div key={index} className={`p-4 rounded-lg border ${message.unread ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'} hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{message.from}</span>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-gray-700">{message.subject}</p>
                  {message.unread && (
                    <div className="mt-2">
                      <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">New</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;