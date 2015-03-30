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

    <link rel="shortcut icon" href="/img/favicon.ico">

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
