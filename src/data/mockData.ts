import { Product } from '../components/ProductCard';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'React Dashboard Pro',
    description: 'Complete admin dashboard with 50+ components, charts, and modern design system',
    price: 299,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Web Application',
    rating: 4.9,
    reviews: 128,
    downloads: 2450,
    seller: {
      name: 'Sarah Johnson',
      verified: true,
      rating: 4.8
    },
    tags: ['React', 'TypeScript', 'Tailwind', 'Dashboard'],
    licenseTypes: ['Standard', 'Extended', 'Enterprise'],
    featured: true
  },
  {
    id: '2',
    name: 'Mobile Banking App UI Kit',
    description: 'Complete mobile banking interface with 40+ screens and seamless UX design',
    price: 199,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mobile App',
    rating: 4.7,
    reviews: 89,
    downloads: 1200,
    seller: {
      name: 'Alex Rodriguez',
      verified: true,
      rating: 4.9
    },
    tags: ['React Native', 'Figma', 'iOS', 'Android'],
    licenseTypes: ['Standard', 'Extended']
  },
  {
    id: '3',
    name: 'E-commerce Analytics Plugin',
    description: 'Advanced analytics plugin for WooCommerce with real-time insights and reporting',
    price: 79,
    image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'WordPress Plugin',
    rating: 4.6,
    reviews: 203,
    downloads: 5600,
    seller: {
      name: 'Emma Wilson',
      verified: true,
      rating: 4.7
    },
    tags: ['WordPress', 'Analytics', 'WooCommerce', 'PHP'],
    licenseTypes: ['Standard', 'Developer']
  },
  {
    id: '4',
    name: 'AI Content Generator API',
    description: 'RESTful API for generating high-quality content using advanced AI models',
    price: 149,
    image: 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'API/Service',
    rating: 4.8,
    reviews: 76,
    downloads: 890,
    seller: {
      name: 'David Kim',
      verified: true,
      rating: 4.9
    },
    tags: ['API', 'AI', 'Node.js', 'Machine Learning'],
    licenseTypes: ['Starter', 'Professional', 'Enterprise']
  },
  {
    id: '5',
    name: 'Vue.js Component Library',
    description: 'Beautiful and accessible Vue.js components with dark mode support',
    price: 129,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Component Library',
    rating: 4.5,
    reviews: 94,
    downloads: 1800,
    seller: {
      name: 'Maria Garcia',
      verified: true,
      rating: 4.6
    },
    tags: ['Vue.js', 'TypeScript', 'Components', 'Dark Mode'],
    licenseTypes: ['Standard', 'Extended']
  },
  {
    id: '6',
    name: 'Flutter Fitness App Template',
    description: 'Complete fitness tracking app with workout plans, nutrition tracking, and social features',
    price: 249,
    image: 'https://images.pexels.com/photos/669609/pexels-photo-669609.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mobile App',
    rating: 4.9,
    reviews: 156,
    downloads: 980,
    seller: {
      name: 'James Thompson',
      verified: true,
      rating: 4.8
    },
    tags: ['Flutter', 'Dart', 'Fitness', 'Mobile'],
    licenseTypes: ['Standard', 'Extended', 'White Label'],
    featured: true
  },
  {
    id: '7',
    name: 'Next.js E-commerce Template',
    description: 'Complete e-commerce solution with payment integration, inventory management, and admin panel',
    price: 399,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Web Application',
    rating: 4.8,
    reviews: 142,
    downloads: 1650,
    seller: {
      name: 'Lisa Chen',
      verified: true,
      rating: 4.9
    },
    tags: ['Next.js', 'E-commerce', 'Stripe', 'TypeScript'],
    licenseTypes: ['Standard', 'Extended', 'Enterprise'],
    featured: true
  },
  {
    id: '8',
    name: 'Angular Admin Dashboard',
    description: 'Professional admin dashboard with advanced data visualization and user management features',
    price: 279,
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Web Application',
    rating: 4.7,
    reviews: 98,
    downloads: 1320,
    seller: {
      name: 'Robert Martinez',
      verified: true,
      rating: 4.8
    },
    tags: ['Angular', 'Dashboard', 'Charts', 'Material UI'],
    licenseTypes: ['Standard', 'Extended'],
    featured: true
  },
  {
    id: '9',
    name: 'Shopify Theme Builder',
    description: 'Drag-and-drop theme builder for Shopify stores with 20+ pre-designed templates',
    price: 189,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Web Application',
    rating: 4.6,
    reviews: 167,
    downloads: 2890,
    seller: {
      name: 'Sophie Williams',
      verified: true,
      rating: 4.7
    },
    tags: ['Shopify', 'E-commerce', 'Liquid', 'Responsive'],
    licenseTypes: ['Standard', 'Developer'],
    featured: true
  },
  {
    id: '10',
    name: 'React Native Chat App',
    description: 'Real-time messaging app with voice calls, file sharing, and group chat functionality',
    price: 329,
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mobile App',
    rating: 4.9,
    reviews: 203,
    downloads: 1540,
    seller: {
      name: 'Michael Brown',
      verified: true,
      rating: 4.9
    },
    tags: ['React Native', 'Chat', 'Real-time', 'WebRTC'],
    licenseTypes: ['Standard', 'Extended', 'White Label'],
    featured: true
  }
];

export const categories = [
  'All Categories',
  'Web Application',
  'Mobile App',
  'WordPress Plugin',
  'API/Service',
  'Component Library',
  'Chrome Extension',
  'Desktop Application'
];

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: Infinity }
];