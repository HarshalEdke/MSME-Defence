/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d9e2f0',
          200: '#b3c5e1',
          300: '#8da8d2',
          400: '#5a7fb8',
          500: '#2f5a9e',
          600: '#1e3f7a',
          700: '#152d5c',
          800: '#0f1f42',
          900: '#0a1428',
          950: '#050a14',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
