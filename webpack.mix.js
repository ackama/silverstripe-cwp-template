const mix = require('laravel-mix');

mix.sourceMaps();

mix
  .sass('themes/silverstripe-template-theme/src/scss/main.scss', 'themes/silverstripe-template-theme/dist/css/')
  .options({
    processCssUrls: false,
  });

mix.js('themes/silverstripe-template-theme/src/js/main.js', 'themes/silverstripe-template-theme/dist/js/');

mix.copyDirectory('themes/silverstripe-template-theme/src/ico', 'themes/silverstripe-template-theme/dist/ico/');
mix.copyDirectory('themes/silverstripe-template-theme/src/img', 'themes/silverstripe-template-theme/dist/img/');
mix.copyDirectory('themes/silverstripe-template-theme/src/fonts', 'themes/silverstripe-template-theme/dist/fonts/');

mix
  .sass('modules/documents-library/scss/documents-library.scss', 'modules/documents-library/dist/css/')
  .js('modules/documents-library/js/documents-library.js', 'modules/documents-library/dist/js/');

mix.webpackConfig({
  externals: {
    jquery: 'jQuery',
  },
  output: {
    path: `${__dirname}/`,
  },
});
