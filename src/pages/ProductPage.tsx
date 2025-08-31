import React, { useState } from 'react';
import { ArrowLeft, Star, Download, Shield, Globe, MessageCircle, Heart, Share2, Check, Eye, Calendar } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductPageProps {
  productId: string | null;
  onNavigate: (page: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, onNavigate }) => {
  const [selectedLicense, setSelectedLicense] = useState('Standard');
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => onNavigate('browse')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const licensePrice = selectedLicense === 'Extended' ? product.price * 2 : 
                        selectedLicense === 'Enterprise' ? product.price * 5 : 
                        product.price;

    addToCart({
      id: `${product.id}-${selectedLicense}`,
      productId: product.id,
      name: product.name,
      price: licensePrice,
      licenseType: selectedLicense,
      image: product.image
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('browse')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-2">
                        {product.name}
                      </h1>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {product.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{product.seller.name}</span>
                        {product.seller.verified && (
                          <Shield className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500">{product.seller.rating} seller rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{product.rating} ({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{product.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 border-b-2 font-medium text-sm transition-colors ${
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

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                      <ul className="space-y-2">
                        {['Modern React 18+ with TypeScript', 'Responsive design for all devices', '50+ pre-built components', 'Dark mode support', 'Advanced charts and analytics', 'Role-based authentication'].map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'demo' && (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-lg p-8 mb-4">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Live Demo</h3>
                      <p className="text-gray-600 mb-4">Experience the product in action</p>
                      <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors btn-animate">
                        Launch Demo
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'documentation' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Installation Guide</h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`npm install react-dashboard-pro
# or
yarn add react-dashboard-pro`}
                      </pre>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Quick Start</h4>
                      <p className="text-gray-700 text-sm">Detailed setup instructions and examples included with purchase.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-gray-500">({product.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[
                        { name: 'John Smith', rating: 5, comment: 'Excellent dashboard template. Clean code and great documentation.', date: '2 days ago' },
                        { name: 'Lisa Johnson', rating: 5, comment: 'Saved me weeks of development time. Highly recommended!', date: '1 week ago' },
                        { name: 'Mike Chen', rating: 4, comment: 'Good quality components, responsive design works perfectly.', date: '2 weeks ago' }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                              <span className="font-medium text-gray-900">{review.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-1">{review.comment}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'support' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Support & Communication</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Direct Developer Support</span>
                      </div>
                      <p className="text-blue-800 text-sm">Get help directly from the developer with lifetime support included.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">Email support included</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">Documentation and guides</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">Bug fixes and updates</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* License Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">License Type</label>
                <div className="space-y-3">
                  {product.licenseTypes.map((license) => {
                    const price = license === 'Extended' ? product.price * 2 : 
                                 license === 'Enterprise' ? product.price * 5 : 
                                 product.price;
                    
                    return (
                      <label key={license} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="license"
                          value={license}
                          checked={selectedLicense === license}
                          onChange={(e) => setSelectedLicense(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{license}</span>
                            <span className="text-sm font-bold text-indigo-600">${price}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {license === 'Standard' && 'Personal and commercial use'}
                            {license === 'Extended' && 'Multiple projects and resale rights'}
                            {license === 'Enterprise' && 'Unlimited use and white-label rights'}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-gray-700">Price</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${selectedLicense === 'Extended' ? product.price * 2 : 
                       selectedLicense === 'Enterprise' ? product.price * 5 : 
                       product.price}
                  </span>
                </div>
                <p className="text-xs text-gray-500">One-time payment, lifetime access</p>
              </div>

              {/* Actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors btn-animate"
                >
                  Add to Cart
                </button>
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">Instant download access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-700">Lifetime updates included</span>
                </div>
              </div>

              {/* Contact Seller */}
              {user && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact Seller</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;