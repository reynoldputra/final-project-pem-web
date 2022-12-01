/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins' : ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}
