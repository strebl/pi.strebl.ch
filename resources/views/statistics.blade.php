@extends('layouts.master')

@section('content')
    <div class="container getting-started">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <a class="btn btn-inverse" href="/">Take me back to the Pi Finder!</a>
            </div>
        </div>
        <div class="statistics">
            <div class="row">
                <div class="col-md-5 col-md-offset-1">
                    <div class="pokes__total">
                        <div class="statistics__icon"><span class="fa fa-bell-o"></span></div>
                        <div class="statistics__title">Total Pokes</div>
                        <div class="statistics__value">{{ $pokes_total }}</div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="devices__total">
                        <div class="statistics__icon"><span class="fa fa-hdd-o"></span></div>
                        <div class="statistics__title">Total Devices</div>
                        <div class="statistics__value">{{ $devices_total }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
