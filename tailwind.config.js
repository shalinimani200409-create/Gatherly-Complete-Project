/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        gatherly: {
          navy: '#0f172a',
          blue: '#2563eb',
          'blue-dark': '#1d4ed8',
          'blue-light': '#eff6ff',
          green: '#059669',
          'green-light': '#ecfdf5',
          yellow: '#d97706',
          'yellow-light': '#fffbeb',
          orange: '#ea580c',
          'orange-light': '#fff7ed',
          red: '#dc2626',
          'red-light': '#fef2f2',
          pink: '#db2777',
          'pink-light': '#fdf2f8',
          purple: '#7c3aed',
          'purple-light': '#f5f3ff',
          maroon: '#9f1239',
          'maroon-light': '#fff1f2',
          gray: '#475569',
          'gray-light': '#f8fafc',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
};