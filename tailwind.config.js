/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary & Accent Colors
        'primary-action': {
          DEFAULT: '#4F46E5', // Base indigo
          dark: '#3730A3',    // Hover/Active state
          light: '#A78BFA',   // Disabled state
          50: '#EEF2FF',      // Very light background
          100: '#E0E7FF',     // Light background
        },
        'success': {
          DEFAULT: '#10B981', // Base green
          dark: '#059669',    // Hover state
          light: '#6EE7B7',   // Light variant
          50: '#ECFDF5',      // Very light background
          100: '#D1FAE5',     // Light background
        },
        'accent-cyan': {
          DEFAULT: '#30CFD0', // Gradient start
          dark: '#0891B2',    // Darker variant
          light: '#67E8F9',   // Lighter variant
          50: '#ECFEFF',      // Very light background
          100: '#CFFAFE',     // Light background
        },
        'gradient-purple': {
          DEFAULT: '#330867', // Gradient end
          light: '#6366F1',   // Lighter variant
        },
        'warning': {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FCD34D',
          50: '#FFFBEB',
          100: '#FEF3C7',
        },
        'error': {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#FCA5A5',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },

        // Neutral & Text Colors
        'text': {
          darkest: '#1F2937',  // Headings on light backgrounds
          dark: '#4B5563',     // Body text on light backgrounds
          medium: '#6B7280',   // Secondary text on light backgrounds
          light: '#FFFFFF',    // Text on dark backgrounds
          muted: '#9CA3AF',    // Placeholder text
        },

        // Background Colors
        'bg': {
          light: '#F9FAFB',    // General page background
          white: '#FFFFFF',    // Card backgrounds
          dark: '#1F2937',     // Dark sections
        },

        // Border Colors
        'border': {
          light: '#E5E7EB',    // Subtle borders
          medium: '#D1D5DB',   // Input borders
          dark: '#9CA3AF',     // Prominent borders
        },

        // Specific UI Elements
        'star-rating': '#FBBF24',  // Rating stars
        'verified-badge': '#10B981', // Verification badges
        'featured-badge': '#F59E0B', // Featured product badges
      },
      
      // Custom gradient utilities
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      
      // Custom backdrop blur utilities
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};
