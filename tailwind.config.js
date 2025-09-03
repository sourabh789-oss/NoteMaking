/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      'keyframes': {
        bounce: {
          '0%,100%': {
            transform: ' translateY(0) '

          },

          '50%': {
            transform: ' translateY(-2rem)'
          }
        }
      },
      'animation':{
        bounce:'bounce 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

