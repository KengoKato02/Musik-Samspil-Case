/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#BF1E2E",
        "steel-blue": "#353A5D",
      },
    },
  },
  plugins: [],
};
