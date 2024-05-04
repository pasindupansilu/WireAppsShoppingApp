/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/index.{js,jsx,ts,tsx}', './App/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        'grey-black': '#21242F',
        'dark-grey': '#373A44',
        'light-grey': '#CCCCCC',
        'oxfard-blue': '#14213D',
        orange: '#FCA311',
        platinum: '#E5E5E5',
        status: {
          info: '#2E77D0',
          success: '#1DB954',
          warning: '#FFF129',
          error: '#E22134',
        },
      },
    },
  },
  plugins: [],
};
