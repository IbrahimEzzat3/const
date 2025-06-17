/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable Tailwind's preflight to avoid conflicts with Material-UI
  corePlugins: {
    preflight: false,
  },
};
