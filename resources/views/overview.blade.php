@extends('layouts.master')

@section('content')
    <div class="container">
        @if($devices->count())

            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="tile --shadow hidden">
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
                    <div class="tile --shadow">
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

@section('javascript')
<script>
    $(document).ready(function(){

        moment.locale('en', {
            relativeTime : {
                future: "in %s",
                past:   "%s ago",
                s:  "%d seconds",
                m:  "a minute",
                mm: "%d minutes",
                h:  "an hour",
                hh: "%d hours",
                d:  "a day",
                dd: "%d days",
                M:  "a month",
                MM: "%d months",
                y:  "a year",
                yy: "%d years"
            }
        });

        var serverOffset = moment($('meta[name=server-time]').attr('content')).diff(new Date()) + 1000;

        var pusher = new Pusher('{{ env('PUSHER_KEY') }}');
        var channel = pusher.subscribe('pi-finder');

        channel.bind('DeviceWasDeleted', function(data) {
            $('#device-' + data.device.id).remove();

            if(! $('.device-row').length) {
                $('.tile--shadow').removeClass('hidden');
                $('#device-table').addClass('hidden');
            }
        });

        channel.bind('ServerWasPoked', function(data) {
            var device = $('#device-' + data.device.id);

            if( device.length ) {
                device.find('.device-name').text(data.device.name);
                device.find('.device-ip').text(data.device.ip);
                device.find('.device-updated_at').text(moment(data.device.updated_at).from( moment(data.device.server_time) )).data('timestamp', data.device.updated_at);
            } else {
                var newRow = "<tr class=\"device-row\" id=\"device-" + data.device.id + "\"> \
                    <td class=\"device-name\">" + data.device.name + "</td> \
                    <td class=\"device-ip\">" + data.device.ip + "</td> \
                    <td data-timestamp=\"" + data.device.created_at + "\" class=\"device-created_at\">" + moment(data.device.created_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                    <td data-timestamp=\"" + data.device.updated_at + "\" class=\"device-updated_at\">" + moment(data.device.updated_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                </tr>";

                $('#device-table tr:last').after(newRow);
            }

            if($('.device-row').length) {
                $('.tile--shadow').addClass('hidden');
                $('#device-table').removeClass('hidden');
            }
        });

        var updateTime = function() {
            $('.device-updated_at').each(function() {
                $(this).text( moment( $(this).data('timestamp')).subtract(serverOffset, 'milliseconds').fromNow() );
            });
        }

        setInterval(updateTime, 1000);

    });
</script>
@endsection