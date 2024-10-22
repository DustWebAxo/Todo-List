/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/components/**/*.{js,vue,ts}",
    "./frontend/layouts/**/*.vue",
    "./frontend/pages/**/*.vue",
    "./frontend/plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
