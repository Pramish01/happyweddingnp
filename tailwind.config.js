/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e0b08",
        bone: "#f8f3ec",
        ivory: "#ede6da",
        gold: "#c8a96e",
        gold2: "#e2c99a",
        muted: "#7a6a56",
        pale: "#b09a80",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
