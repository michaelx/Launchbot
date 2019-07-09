module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-advanced-variables': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      autoprefixer: {
        cascade: true
      }
    },
    'cssnano': {}
  }
};
