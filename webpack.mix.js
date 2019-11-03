const mix = require('laravel-mix');

mix.sourceMaps();

mix
  .sass('themes/silverstripe-template-project/src/scss/main.scss', 'themes/silverstripe-template-project/dist/css/')
  .options({
    processCssUrls: false,
  });

mix.js('themes/silverstripe-template-project/src/js/main.js', 'themes/silverstripe-template-project/dist/js/');

mix.copyDirectory('themes/silverstripe-template-project/src/ico', 'themes/silverstripe-template-project/dist/ico/');
mix.copyDirectory('themes/silverstripe-template-project/src/img', 'themes/silverstripe-template-project/dist/img/');
mix.copyDirectory('themes/silverstripe-template-project/src/fonts', 'themes/silverstripe-template-project/dist/fonts/');

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
