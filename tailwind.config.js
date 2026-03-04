// File Name: tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#064e3b',
          950: '#022c22',
        },
        saffron: '#f4c430',
      },
    },
  },
  plugins: [],
}
