/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      phablet: '420px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {},
  },
  plugins: [],
};
