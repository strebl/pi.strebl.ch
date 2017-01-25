let mix = require('laravel-mix').mix;
let webpack = require('webpack');

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
   .js('resources/assets/js/charts.js', 'public/js')
   .version()
   .webpackConfig({
       plugins: [
           new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
       ]
   });

if(process.env.NODE_ENV === 'development') {
    mix.sass('resources/assets/sass/app.scss', 'public/css')
} else {
   mix.sass('resources/assets/sass/uncss/app.scss', 'public/css')
}