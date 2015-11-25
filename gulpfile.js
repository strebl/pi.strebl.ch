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
    mix.rubySass('app.scss');

    mix.scripts([
        'html5shiv/dist/html5shiv.min.js',
        'respond/dest/respond.min.js'
    ], 'public/js/ie.min.js', 'bower_components');

    mix.browserify('app.js');

    mix.scripts([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/sweetalert/lib/sweet-alert.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/pusher/dist/pusher.min.js',
        'resources/assets/js/vendor/flat-ui-pro.min.js',
        'resources/assets/js/vendor/prism.js',
        'resources/assets/js/app.js'
    ], null, './');

    mix.scripts([
        'bower_components/raphael/raphael-min.js',
        'bower_components/morrisjs/morris.min.js',
        'bower_components/Chart.js/Chart.min.js',
        'resources/assets/js/charts.js'
    ], 'public/js/charts.js', './');

    mix.version(['css/app.css', 'js/all.js', 'js/charts.js']);
});
