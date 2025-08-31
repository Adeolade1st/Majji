import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Zap, Shield, Users, TrendingUp, Star, Download, Search, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onProductSelect: (productId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onProductSelect }) => {
  const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 10);
  const topRatedProducts = mockProducts.sort((a, b) => b.rating - a.rating).slice(0, 3);
  
  // Carousel functionality
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const cardWidth = 320; // Width of each card including gap
  const visibleCards = 3; // Number of cards visible at once on desktop
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      const maxIndex = Math.max(0, featuredProducts.length - visibleCards);
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxIndex = Math.max(0, featuredProducts.length - visibleCards);
        const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        scrollRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 4000); // Auto-scroll every 4 seconds
    
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling, featuredProducts.length, visibleCards, cardWidth]);
  
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient-bg min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Value exchange happens here!
              </h1>
              
              <h4 className="text-xl md:text-2xl text-white/90 mb-12 font-medium">
                Solutions built by the brightest for your business.
              </h4>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  className="hero-search w-full pl-12 pr-4 py-5 text-xl border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Apps on Sale</h2>
            <button
              onClick={() => onNavigate('browse')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View All 130 Apps</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product, index) => {
              const discounts = ['55%', '20%', '20%', '10%'];
              const originalPrices = [product.price * 2.2, product.price * 1.25, product.price * 1.25, product.price * 1.1];
              
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onProductSelect(product.id)}>
                  {/* Discount Badge */}
                  <div className="flex justify-end mb-4">
                    <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
                      - {discounts[index]}
                    </span>
                  </div>
                  
                  {/* Product Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Product Info */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  {/* Trial Info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {index === 3 ? 'Free plan available' : `${7 + (index * 7)} day free trial`}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Majji?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most trusted platform for buying and selling digital software solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Verified</h3>
              <p className="text-gray-600">All products are thoroughly reviewed and sellers are verified for quality assurance</p>
            </div>

            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Get immediate access to your purchased software with automated delivery</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Connect directly with developers and get dedicated support for your purchases</p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fair Revenue</h3>
              <p className="text-gray-600">Developers keep 85% of sales with transparent pricing and no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Hand-picked premium software solutions from verified developers</p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="hidden sm:flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            <button
              onClick={scrollRight}
              disabled={currentIndex >= Math.max(0, featuredProducts.length - visibleCards)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Featured products carousel"
            >
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-80 transform transition-transform duration-300 hover:scale-105"
                  style={{ minWidth: '320px' }}
                >
                  <ProductCard 
                    product={product} 
                    onSelect={onProductSelect}
                  />
                </div>
              ))}
            </div>
            
            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(featuredProducts.length / visibleCards) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / visibleCards) === index
                      ? 'bg-indigo-600 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Rated Products</h2>
            <p className="text-gray-600">Highest quality software solutions loved by our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topRatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={onProductSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">25K+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">8K+</div>
              <div className="text-gray-600">Verified Developers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">150K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">$2M+</div>
              <div className="text-gray-600">Developer Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and businesses already using Majji to grow their success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('auth')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors btn-animate"
            >
              Start Selling Today
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors btn-animate"
            >
              Sign Up
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-colors btn-animate"
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;