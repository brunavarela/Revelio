/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'causten-thin': ['Causten-Thin'],
        'causten-light': ['Causten-Light'],
        'causten-regular': ['Causten-Regular'],
        'causten-medium': ['Causten-Medium'],
        'causten-bold': ['Causten-Bold'],
      },
    },
  },
  plugins: [],
};
