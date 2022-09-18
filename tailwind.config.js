/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/*.{html,js}"],
  theme: {
    extend: {
      minWidth:{
        '35': '350px',
        '15':'150px',
      }
    },
  },
  plugins: [],
}


