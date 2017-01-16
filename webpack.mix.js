let mix = require('laravel-mix').mix;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .combine([
       'node_modules/raphael/raphael.min.js',
       'node_modules/morris.js/morris.min.js',
       'node_modules/chart.js/Chart.min.js',
       'resources/assets/js/charts.js'
    ], 'public/js/charts.js')
   .version();
