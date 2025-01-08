/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths to your project
  ],
  safelist: [
    'bg-cyan-400', // Add all possible bg_color values
    'bg-orange-400	',
    'bg-teal-500',
    'bg-fuchsia-500',
    'bg-cyan-500',
    'bg-green-400',
    'bg-orange-500',
    "bg-rose-500",
    "bg-pink-500",
    "bg-violet-500",
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [],
};
