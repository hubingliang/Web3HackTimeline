/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2e5041",

          secondary: "#9e5345",

          accent: "#1FB2A6",

          neutral: "#191D24",

          "base-100": "#efeae2",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
