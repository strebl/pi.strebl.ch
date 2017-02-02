<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pi Finder</title>
    <meta name="description" content="Did you ever search your Raspberry Pi or another device without monitor in your network? Anoying hmm? Pi Finder is here to solve that problem for you. Try it now!"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Loading App css -->
    <link href="{{ mix("css/app.css") }}" rel="stylesheet">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

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
    @if(isset($group))
        <meta name="pusher-channel" content="{{ config('broadcasting.connections.pusher.channel') }}-{{ $group }}" />
    @else
        <meta name="pusher-channel" content="{{ config('broadcasting.connections.pusher.channel') }}" />
    @endif
    <meta name="pusher-key" content="{{ config('broadcasting.connections.pusher.key') }}">

</head>
<body id="csstyle">
{{-- @include('layouts.partials.navbar') --}}

<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-raspberry-pi" viewBox="0 0 26 32">
<title>raspberry-pi</title>
<path class="path1" d="M7.331 0v0c0.309-0.011 0.575 0.172 0.862 0.262 0.697-0.226 0.855 0.090 1.196 0.219 0.758-0.162 0.991 0.183 1.358 0.553l0.413-0.011c1.146 0.675 1.717 2.051 1.918 2.759 0.201-0.708 0.776-2.083 1.918-2.759l0.413 0.011c0.363-0.37 0.596-0.711 1.358-0.553 0.341-0.126 0.499-0.445 1.196-0.219 0.435-0.137 0.815-0.499 1.39-0.047 0.485-0.187 0.959-0.255 1.379 0.126 0.65-0.083 0.851 0.097 1.013 0.298 0.144-0.004 1.070-0.147 1.494 0.481 1.063-0.126 1.404 0.621 1.024 1.322 0.215 0.338 0.438 0.668-0.068 1.311 0.18 0.356 0.068 0.751-0.356 1.218 0.111 0.503-0.111 0.851-0.506 1.128 0.075 0.686-0.629 1.088-0.84 1.228-0.079 0.399-0.244 0.779-1.045 0.988-0.133 0.596-0.625 0.704-1.092 0.826 1.544 0.898 2.87 2.076 2.863 4.978l0.23 0.402c1.771 1.078 3.366 4.54 0.873 7.356-0.162 0.88-0.435 1.519-0.679 2.22-0.363 2.823-2.741 4.141-3.369 4.299-0.916 0.7-1.886 1.365-3.208 1.828-1.246 1.286-2.597 1.771-3.955 1.771-0.022 0-0.050 0-0.068 0-1.358 0-2.708-0.485-3.955-1.771-1.322-0.463-2.288-1.128-3.208-1.828-0.625-0.158-3.003-1.476-3.369-4.299-0.244-0.7-0.514-1.336-0.679-2.22-2.493-2.816-0.898-6.279 0.873-7.356l0.23-0.402c-0.007-2.899 1.318-4.080 2.863-4.975-0.467-0.126-0.959-0.23-1.092-0.826-0.805-0.208-0.966-0.589-1.045-0.988-0.208-0.144-0.912-0.542-0.841-1.228-0.395-0.277-0.618-0.625-0.506-1.128-0.424-0.467-0.535-0.862-0.356-1.218-0.506-0.639-0.273-0.973-0.057-1.311-0.381-0.7-0.050-1.448 1.013-1.322 0.424-0.632 1.351-0.485 1.494-0.481 0.158-0.201 0.363-0.384 1.013-0.298 0.42-0.381 0.894-0.313 1.379-0.126 0.201-0.158 0.37-0.215 0.532-0.219v0zM7.378 0.815v0c0.158 0.198 0.374 0.384 0.136 0.611-0.323-0.205-0.643-0.417-1.415-0.564 0.172 0.198 0.528 0.402 0.309 0.596-0.409-0.158-0.858-0.277-1.358-0.345 0.241 0.201 0.438 0.399 0.241 0.553-0.435-0.137-1.034-0.32-1.62-0.162l0.366 0.381c0.040 0.050-0.869 0.036-1.473 0.047 0.219 0.309 0.445 0.607 0.575 1.139-0.061 0.061-0.363 0.029-0.643 0 0.287 0.614 0.79 0.772 0.909 1.034-0.176 0.136-0.424 0.104-0.69 0.011 0.208 0.435 0.647 0.729 0.988 1.081-0.086 0.061-0.237 0.101-0.596 0.057 0.316 0.341 0.708 0.661 1.16 0.941-0.079 0.093-0.363 0.086-0.621 0.093 0.413 0.409 0.941 0.629 1.437 0.898-0.248 0.172-0.42 0.129-0.611 0.126 0.352 0.295 0.952 0.445 1.505 0.621-0.104 0.165-0.212 0.219-0.438 0.266 0.585 0.33 1.43 0.176 1.667 0.345-0.057 0.165-0.219 0.277-0.413 0.366 0.945 0.057 3.527-0.036 4.023-2.022-0.966-1.078-2.733-2.353-5.769-3.919 2.363 0.805 4.49 1.871 6.275 3.344 2.098-0.991 0.657-3.491-0.366-4.483-0.050 0.262-0.115 0.435-0.183 0.481-0.334-0.363-0.607-0.744-1.034-1.092 0 0.205 0.108 0.435-0.151 0.596-0.23-0.313-0.542-0.6-0.955-0.841 0.198 0.348 0.040 0.453-0.068 0.596-0.305-0.273-0.603-0.542-1.185-0.758v0zM18.85 0.815v0c-0.582 0.216-0.88 0.485-1.196 0.758-0.108-0.144-0.269-0.248-0.068-0.596-0.413 0.237-0.726 0.524-0.955 0.841-0.255-0.162-0.147-0.391-0.151-0.596-0.427 0.348-0.7 0.729-1.034 1.092-0.068-0.050-0.133-0.219-0.183-0.481-1.024 0.991-2.468 3.491-0.366 4.483 1.785-1.473 3.912-2.543 6.275-3.344-3.039 1.566-4.802 2.841-5.769 3.919 0.496 1.986 3.078 2.080 4.023 2.022-0.194-0.090-0.356-0.201-0.413-0.366 0.237-0.169 1.081-0.014 1.667-0.345-0.226-0.047-0.33-0.097-0.438-0.266 0.553-0.176 1.153-0.327 1.505-0.621-0.19 0.004-0.363 0.047-0.611-0.126 0.496-0.269 1.024-0.489 1.437-0.898-0.259-0.007-0.539 0.004-0.621-0.093 0.456-0.28 0.844-0.6 1.16-0.941-0.359 0.043-0.51 0.004-0.596-0.057 0.345-0.352 0.779-0.647 0.988-1.081-0.266 0.093-0.514 0.122-0.69-0.011 0.119-0.262 0.621-0.42 0.909-1.034-0.28 0.029-0.585 0.061-0.643 0 0.129-0.532 0.356-0.83 0.575-1.139-0.6-0.007-1.512 0.004-1.473-0.047l0.366-0.381c-0.589-0.158-1.185 0.025-1.62 0.162-0.198-0.154 0.004-0.352 0.241-0.553-0.499 0.068-0.948 0.187-1.358 0.345-0.219-0.198 0.137-0.402 0.309-0.596-0.772 0.147-1.088 0.356-1.415 0.564-0.226-0.226-0.011-0.413 0.147-0.611v0zM13.067 8.987c-1.677-0.043-3.283 1.254-3.287 2.001-0.004 0.909 1.322 1.828 3.297 1.85 2.019 0.014 3.305-0.74 3.312-1.677 0.007-1.060-1.835-2.187-3.322-2.173zM7.999 9.619v0c-2.328 0.043-4.106 1.656-4.023 4.321 0.093 1.167 6.092-4.066 5.057-4.242-0.352-0.057-0.704-0.083-1.034-0.079zM17.826 9.712c-0.334-0.007-0.682 0.022-1.034 0.079-1.034 0.172 4.964 5.409 5.057 4.242 0.083-2.665-1.695-4.278-4.023-4.321zM16.63 12.909c-0.621 0.018-1.225 0.223-1.713 0.632-1.871 1.577-1.257 4.72 0.596 6.045 0.144 0.101 0.287 0.201 0.438 0.287 1.063 0.639 2.529 0.657 3.506-0.162 1.871-1.577 1.257-4.72-0.596-6.045-0.144-0.097-0.287-0.198-0.438-0.287-0.532-0.32-1.171-0.489-1.792-0.471v0zM9.483 12.977v0c-2.008-0.086-3.843 1.825-4.001 3.815-0.011 0.172-0.025 0.341-0.022 0.517 0 1.239 0.736 2.507 1.943 2.92 2.317 0.79 4.68-1.358 4.863-3.631 0.011-0.172 0.022-0.356 0.022-0.528 0-1.239-0.736-2.507-1.943-2.92-0.291-0.101-0.575-0.162-0.862-0.172v0zM22.183 15.115c-1.415 0.025-0.363 6.731 0.92 6.16 1.458-1.171 1.918-4.608-0.783-6.149-0.050-0.014-0.093-0.011-0.137-0.011v0zM3.653 15.204v0c-0.047 0-0.086-0.004-0.136 0.011-2.701 1.541-2.238 4.978-0.783 6.149 1.282 0.571 2.335-6.135 0.92-6.16v0zM13.229 19.816c-0.022 0-0.054 0-0.075 0-2.008 0-3.639 1.505-3.639 3.355v0.025c0 0.022 0 0.057 0 0.079 0 1.853 1.631 3.355 3.639 3.355s3.639-1.505 3.639-3.355c0-0.022 0-0.057 0-0.079v-0.025c0-1.807-1.591-3.312-3.552-3.355h-0.011zM21.196 21.081c-0.851 0.022-1.871 0.84-2.838 1.932h0.011c-1.128 1.318-1.764 3.721-0.941 4.493 0.787 0.603 2.902 0.517 4.461-1.645 1.131-1.451 0.751-3.872 0.104-4.519-0.244-0.187-0.514-0.273-0.797-0.262zM4.63 21.594c-0.219 0.022-0.42 0.093-0.611 0.208-0.672 0.51-0.797 2.245 0.162 3.955 1.419 2.037 3.409 2.241 4.231 1.746 0.869-0.65 0.399-2.848-0.643-4.102-0.894-1.038-1.994-1.764-2.909-1.803-0.075-0.004-0.154-0.007-0.23-0.004v0zM13.171 27.607c-1.451-0.036-3.682 0.575-3.657 1.369-0.022 0.539 1.746 2.101 3.552 2.022 1.746 0.029 3.552-1.519 3.527-2.205-0.004-0.711-1.961-1.25-3.423-1.185z"></path>
</symbol>
</defs>
</svg>

<div class="app-header">
    <svg class="app-header__background-icon icon-raspberry-pi"><use xlink:href="#icon-raspberry-pi"></use></svg>
    <a href="/getting-started" class="app-header__nav">Getting Started</a>
    <a href="https://github.com/strebl/pi.strebl.ch" class="app-header__nav --right">GitHub</a>
    <a href="https://twitter.com/pifinder" class="app-header__nav --right">Twitter</a>
    <div class="container">
        <div class="app-header__icon">
            <a href="/">
                <svg class="icon-raspberry-pi"><use xlink:href="#icon-raspberry-pi"></use></svg>
            </a>
        </div>
        <h1 class="app-header__title"><a href="/">Pi Finder</a></h1>
        <h2 class="app-header__subtitle">
            Find your Raspberry Pi or any other unix based device in your network.
            <a href="/getting-started">Easy.</a>
        </h2>
    </div> <!-- container -->
</div> <!-- container__header -->

@yield('content')

<script src={{ mix("js/app.js") }}></script>
@yield('javascript')

</body>
</html>
