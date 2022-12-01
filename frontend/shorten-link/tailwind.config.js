/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins' : ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}