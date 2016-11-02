var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');

    mix.webpack('app.js');

    mix.scripts([
        'public/js/app.js',
        'resources/assets/js/vendor/flat-ui-pro.min.js'
    ], null, './');

    mix.scripts([
        'node_modules/raphael/raphael.min.js',
        'node_modules/morris.js/morris.min.js',
        'node_modules/chart.js/Chart.min.js',
        'resources/assets/js/charts.js'
    ], 'public/js/charts.js', './');

    mix.version(['css/app.css', 'js/all.js', 'js/charts.js']);
});
