const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg1: '#1b1421',
        bg2: '#2d2633',
      },
    },
  },
  variants: {},
  plugins: [],
};
