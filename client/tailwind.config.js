module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      custom_red: "#F7282F"
    },
    extend: {
      screens: {
        'md-max': { 'max': '768px' }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
