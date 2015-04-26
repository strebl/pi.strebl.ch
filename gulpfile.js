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

    mix.scripts([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/sweetalert/lib/sweet-alert.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/pusher/dist/pusher.min.js',
        'resources/js/vendor/flat-ui-pro.min.js',
        'resources/js/vendor/prism.js',
        'resources/js/app.js'
    ], null, './');

    mix.version(['css/app.css', 'js/all.js']);
});
