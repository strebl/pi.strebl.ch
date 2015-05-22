<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pi Finder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Loading App css -->
    <link href="{{ elixir("css/app.css") }}" rel="stylesheet">

    <!--<link rel="shortcut icon" href="/img/favicon/favicon.ico">-->
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/img/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/img/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/img/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/img/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/img/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/img/favicon/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="/img/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="/img/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="/img/favicon/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="/img/favicon/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="/img/favicon/mstile-310x310.png" />
    <meta name="server-time" content="{{ \Carbon\Carbon::now() }}" />
    <meta name="pusher-channel" content="{{ env('PUSHER_CHANNEL', 'pi-finder') }}" />


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="/js/ie.min.js"></script>
    <![endif]-->
</head>
<body id="csstyle">
{{-- @include('layouts.partials.navbar') --}}

<div class="app-header">
    <a href="/getting-started" class="app-header__nav">Getting Started</a>
    <!-- <a href="/getting-started" class="app-header__nav --right">Introduction</a> -->
    <div class="container">
        <div class="app-header__icon">
            <a href="/"><span class="icon-raspberrypi"></span></a>
        </div>
        <h1 class="app-header__title"><a href="/">Pi Finder</a></h1>
        <h2 class="app-header__subtitle">
            Find your Raspberry Pi or any other unix based device in your network.
            <a href="/getting-started">Easy.</a>
        </h2>
    </div> <!-- container -->
</div> <!-- container__header -->

@yield('content')

<script src={{ elixir("js/all.js") }}></script>
@yield('javascript')

</body>
</html>
