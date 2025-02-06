/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1359F4",
        "mid-blue": "#34A8FF",
        "light-blue": "#93C5FF",
      },
      boxShadow: {
        "custom-shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        source: ['"Source Code Pro"', "monospace"],
      },
    },
  },
  plugins: [],
};
