@extends('layouts.master')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <a class="btn btn-inverse" href="/">Take me back to the Pi Finder!</a>
            </div>
        </div>
        <div class="statistics">
            <div class="row">
                <div class="col-md-5 col-md-offset-1">
                    <div class="statistics__statistic">
                        <div class="pokes__total">
                            <div class="statistics__icon"><span class="fa fa-bell-o"></span></div>
                            <div class="statistics__value">{{ $pokes_total }}</div>
                            <div class="statistics__title">Total Pokes</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="statistics__statistic">
                        <div class="devices__total">
                            <div class="statistics__icon"><span class="fa fa-hdd-o"></span></div>
                            <div class="statistics__value">{{ $devices_total }}</div>
                            <div class="statistics__title">Total Devices</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="statistics__statistic">
                        <div class="pokes_graph">
                            <div class="statistics__icon"><span class="fa fa-bar-chart"></span></div>
                            <div class="statistics__title">Pokes Chart</div>
                            <div class="statistics__value" id="pokes_graph"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('javascript')
    <script src={{ elixir("js/charts.js") }}></script>
@append
