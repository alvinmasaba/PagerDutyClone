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
        logoGreen:'#00b043',
      },
      boxShadow: {
        activeGreen: '0px 0px 2px 1px lime',
        inactiveRed: '0px 0px 2px 1px #f44336',
      }
    },
  },
  plugins: [],
}