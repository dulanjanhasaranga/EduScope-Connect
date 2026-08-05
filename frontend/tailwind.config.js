/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  safelist: [
    'from-blue-500', 'to-cyan-500', 'bg-blue-50', 'border-blue-200', 'text-blue-600',
    'from-purple-500', 'to-pink-500', 'bg-purple-50', 'border-purple-200', 'text-purple-600',
    'from-emerald-500', 'to-teal-500', 'bg-emerald-50', 'border-emerald-200', 'text-emerald-600',
    'from-orange-500', 'to-amber-500', 'bg-orange-50', 'border-orange-200', 'text-orange-600',
    'from-red-500', 'to-rose-500', 'bg-red-50', 'border-red-200', 'text-red-600',
    'from-gray-500', 'to-gray-600', 'bg-gray-50', 'border-gray-200', 'text-gray-600'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        heading: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f0fa',
          100: '#cce1f5',
          200: '#99c3eb',
          300: '#66a5e1',
          400: '#3387d7',
          500: '#0063ce', // Eduscope Blue
          600: '#0059b9',
          700: '#004878', // Eduscope Dark Blue
          800: '#003c64',
          900: '#003152',
        },
        accent: {
          500: '#cc3366', // Eduscope Pink/Red
          600: '#b32d59',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
