@extends('layouts.master')

@section('content')
    <div class="container getting-started">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <a class="btn btn-inverse" href="/">Take me back to the Pi Finder!</a>
                {!! $gettingStarted !!}
                <a class="btn btn-inverse mtl mbl" href="/">Take me back to the Pi Finder!</a>
            </div>
        </div>
    </div>
@endsection