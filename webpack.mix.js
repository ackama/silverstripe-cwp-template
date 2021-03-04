const mix = require('laravel-mix');

mix
  .sass('app/assets/scss/main.scss', 'public/dist/css')
  .sass('app/assets/scss/editor.scss', 'public/dist/css')
  .js('app/assets/js/main.js', 'public/dist/js')
  .copy('app/assets/fonts/*', 'public/dist/fonts')
  .copy('app/assets/ico/*', 'public/dist/ico')
  .copy('app/assets/img/*', 'public/dist/img');

mix.webpackConfig({
  externals: {
    jquery: 'jQuery'
  }
});
