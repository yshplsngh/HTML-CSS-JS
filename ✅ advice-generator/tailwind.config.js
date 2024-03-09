/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors:{
        'mncolor':'hsl(218, 23%, 16%)',
        'boxcolor':'hsl(217, 19%, 24%)',
        'neoncolor':'hsl(150, 100%, 66%)',
        'whicolor':'hsl(193, 38%, 86%)',
      },
      backgroundImage: {
        'mob-pattern': "url('/images/pattern-divider-mobile.svg')",
        'win-pattern': "url('/images/pattern-divider-desktop.svg')",
      }

    },
  },
  plugins: [],
}

