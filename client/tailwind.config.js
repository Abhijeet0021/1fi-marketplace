/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        onefi: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#5E2BE9', // 1Fi primary brand
          600: '#4F26E9',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          accent: '#10B981',
        },
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(94, 43, 233, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
