module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'regal-odd': '#273548',
        'regal-table': '#303950',
        'regal-even ': '#283448',
      },
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '100%': '100%',
      16: '4rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
