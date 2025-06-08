/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#D1A27A',
        bronze: '#B98560',
        cocoa: '#6B3F33',
        caramel: '#C68642',
        honey: '#D2A86A',
        base:'#964B00',
        goldBrown: '#A67B50',
        mahogany: '#6B3F33',
        chestnut: '#8B5E3C',
        amberGlow: '#FFB300',
        ebony: '#3B2F2F',
        greno: '#1BAF54'
      },
      // Optional: Add a gradient using these colors
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #D1A27A 0%, #B98560 50%, #6B3F33 100%)',
      },
    },
  },
  plugins: [],
}