/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths to your project
  ],
  safelist: [
    'bg-sky-500', // Add all possible bg_color values
    'bg-blue-500',
    'bg-teal-500',
    'bg-fuchsia-500',
    'bg-cyan-500',
    'bg-green-500',
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
