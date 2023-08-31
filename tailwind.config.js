/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f44336",
        secondary: "#311B92",
        secondaryLight: "#9C27B0",
        gold: "#1B5E20",
        goldDark: "#FFC107",
        green: "#11cb5f",
      },
    },
  },
  plugins: [],
};
