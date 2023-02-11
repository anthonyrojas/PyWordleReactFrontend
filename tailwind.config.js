/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-bounce': "bounce 0.5s ease-in-out 1"
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      amber: colors.amber,
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      slate: colors.slate,
      sky: colors.sky
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
