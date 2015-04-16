@extends('layouts.master')

@section('content')
    <div class="container">
        @if($devices->count())

            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="table-container table-responsive">
                        <table class="table">
                            <tr>
                                <th colspan="4" class="table-header">Devices</th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>IP</th>
                                <th>Added</th>
                                <th>Last Contact</th>
                            </tr>
                            @foreach($devices as $device)
                                <tr>
                                    <td>{{ $device->name }}</td>
                                    <td>{{ $device->ip }}</td>
                                    <td>{{ $device->created_at->diffForHumans() }}</td>
                                    <td>{{ $device->updated_at->diffForHumans() }}</td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>

            </div> <!-- row -->

        @else

            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="tile tile--shadow">
                        <h2>Nope!</h2>
                        <p class="lead">No Pi poked me yet.</p>
                    </div>
                </div>
            </div>

        @endif

    </div> <!-- container -->

@stop