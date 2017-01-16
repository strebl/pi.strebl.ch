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
                <div class="col-md-4">
                    <div class="statistics__statistic">
                        <div class="pokes__total">
                            <div class="statistics__icon"><span class="fa fa-bell-o"></span></div>
                            <div class="statistics__value">{{ $pokes_total }}</div>
                            <div class="statistics__title">Total Pokes</div>
                        </div>
                    </div>
                </div> <!-- Total Pokes Chart -->
                <div class="col-md-5">
                    <div class="statistics__statistic">
                        <div class="network_graph">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="statistics__icon"><span class="fa fa-share-alt"></span></div>
                                </div>
                                <div class="network_chart">
                                    <div class="col-md-7">
                                        <canvas class="network_chart__chart" id="network_chart"></canvas>
                                    </div>
                                    <div class="col-md-5" id="network_chart_legend"></div>
                                </div>
                                <div class="col-md-12">
                                    <div class="statistics__title">Network Distribution</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- Network Distribution Chart -->
                <div class="col-md-3">
                    <div class="statistics__statistic">
                        <div class="devices__total">
                            <div class="statistics__icon"><span class="fa fa-hdd-o"></span></div>
                            <div class="statistics__value">{{ $devices_total }}</div>
                            <div class="statistics__title">Total Devices</div>
                        </div>
                    </div>
                </div> <!-- Total Devices Chart -->
            </div>
            <div class="row">
                <div class="col-md-12">
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
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src={{ mix("js/charts.js") }}></script>
@append
