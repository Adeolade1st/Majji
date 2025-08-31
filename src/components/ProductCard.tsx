import React from 'react';
import { Star, Download, Eye, Shield, Heart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  downloads: number;
  seller: {
    name: string;
    verified: boolean;
    rating: number;
  };
  tags: string[];
  licenseTypes: string[];
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div 
      className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-200 hover:border-indigo-300"
      onClick={() => onSelect(product.id)}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Seller */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-700">{product.seller.name}</span>
          {product.seller.verified && (
            <Shield className="h-3 w-3 text-green-500" />
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Download className="h-3 w-3" />
            <span>{product.downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{product.reviews} reviews</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{product.tags.length - 3}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-500 ml-1">/{product.licenseTypes[0]}</span>
          </div>
          <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors btn-animate">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;