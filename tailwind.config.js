module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100%": "100%",
      16: "4rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
