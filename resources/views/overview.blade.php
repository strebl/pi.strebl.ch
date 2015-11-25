@extends('layouts.master')

@section('content')
    <div class="container">
        @if($devices->count())

            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="tile --shadow js-no-devices hidden">
                        <h2>Nope!</h2>
                        <p class="lead">No Pi poked me yet.</p>
                    </div>
                    <div class="table-container">
                        <table class="table" id="device-table">
                            @include('partials.device-table-header')
                            @foreach($devices as $device)
                                <tr class="device-row" id="device-{{ $device->id }}">
                                    <td class="device-name">{{ $device->name }}</td>
                                    <td class="device-ip">{{ $device->ip }}</td>
                                    <td data-timestamp="{{ $device->created_at }}" class="device-created_at">{{ $device->created_at->diffForHumans() }}</td>
                                    <td data-timestamp="{{ $device->updated_at }}" class="device-updated_at">{{ $device->updated_at->diffForHumans() }}</td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>

            </div> <!-- row -->

        @else

            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="tile --shadow js-no-devices">
                        <h2>Nope!</h2>
                        <p class="lead">No Pi poked me yet.</p>
                    </div>
                    <div class="table-container">
                        <table class="table hidden" id="device-table">
                            @include('partials.device-table-header')
                        </table>
                    </div>
                </div>
            </div>

        @endif

    </div> <!-- container -->

@stop
