const mix = require('laravel-mix');

mix.sourceMaps();

mix
  .sass('app/themes/silverstripe-template-theme/src/scss/main.scss', 'app/themes/silverstripe-template-theme/dist/css/')
  .options({
    processCssUrls: false,
  });

mix.js('app/themes/silverstripe-template-theme/src/js/main.js', 'app/themes/silverstripe-template-theme/dist/js/');

mix.copyDirectory('app/themes/silverstripe-template-theme/src/ico', 'app/themes/silverstripe-template-theme/dist/ico/');
mix.copyDirectory('app/themes/silverstripe-template-theme/src/img', 'app/themes/silverstripe-template-theme/dist/img/');
mix.copyDirectory('app/themes/silverstripe-template-theme/src/fonts', 'app/themes/silverstripe-template-theme/dist/fonts/');

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
