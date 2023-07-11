/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f44336",
        secondary: "#11cb5f",
        danger: "#e53e3e",
      },
    },
  },
  plugins: [],
};
