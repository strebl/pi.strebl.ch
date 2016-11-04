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
    /*
     * prod
     */
    // mix.sass('app.scss');

    /*
     * prod
     *
     * Generate uncss.css:
     * NODE_TLS_REJECT_UNAUTHORIZED=0 uncss http://pi.strebl.ch.dev/ http://pi.strebl.ch.dev/@test http://pi.strebl.ch.dev/getting-started http://pi.strebl.ch.dev/stats --ignoreSheets /bootstrapcdn/ > resources/assets/css/uncss.css
     */
    mix.styles('uncss.css', 'public/css/app.css');

    mix.webpack('app.js');

    mix.scripts([
        'node_modules/raphael/raphael.min.js',
        'node_modules/morris.js/morris.min.js',
        'node_modules/chart.js/Chart.min.js',
        'resources/assets/js/charts.js'
    ], 'public/js/charts.js', './');

    mix.version(['css/app.css', 'js/all.js', 'js/charts.js']);
});
