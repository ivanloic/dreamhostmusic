/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Make Roboto Slab available as a named family and set as default 'sans'
        'roboto-slab': ["Roboto Slab", 'serif'],
        sans: ["Roboto Slab", 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial'],
      },
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',
        accent: '#d69e2e',
      },
    },
  },
  plugins: [],
}