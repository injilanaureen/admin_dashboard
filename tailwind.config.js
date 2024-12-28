/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths to your project
  ],
  theme: {
    extend: {
      colors: {
        customSky: '#0ea5e9', // Example: sky-blue
        customOrange: 'bg-orange-900', // Example: orange
        customRed: '#dc2626', // Example: red
        customGreen: 'bg-lime-500', // Example: green
        customViolet: '#8b5cf6', // Example: violet
        customPink: '#ec4899', // Example: pink
        customEmerald: '#10b981', // Example: emerald
        customFuchsia: '#d946ef', // Example: fuchsia
        customRose: '#f43f5e', // Example: rose
        customCyan: '#06b6d4', // Example: cyan
        customOrangeLight: '#fbbf24', // Example: light-orange
      },
    },
  },
  plugins: [],
};
