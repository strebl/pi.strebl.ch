<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pi Finder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Loading Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <!-- Loading Font Awesome -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <!-- Loading Flat UI Pro -->
    <link href="/css/flat-ui-pro.min.css" rel="stylesheet">

    <!-- Loading App css -->
    <link href="/css/app.css" rel="stylesheet">

    <!-- Loading Sweet Alert -->
    <link rel="stylesheet" type="text/css" href="/css/sweet-alert.css">

    <!-- Loading Sweet Alert -->
    <link rel="stylesheet" type="text/css" href="/css/font-mfizz.css">

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


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="/js/html5shiv.js"></script>
    <script src="/js/respond.min.js"></script>
    <![endif]-->
</head>
<body>
{{-- @include('layouts.partials.navbar') --}}

@yield('content')

<!-- jQuery (necessary for Flat UI's JavaScript plugins) -->
<script src="/js/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/js/flat-ui-pro.min.js"></script>
<script src="/js/sweet-alert.min.js"></script>
@yield('javascript')

</body>
</html>
