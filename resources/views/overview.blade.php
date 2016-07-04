@extends('layouts.master')

@section('content')
    <div id="app" class="container">
        @if(request()->getHost() == 'pi.strebl.ch')
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="alert alert-danger" style="color: #a94442;">
                        <p>
                            <h4>Please Update your Configuration!</h4>
                            <strong>There are changes...</strong> <br>
                            It seems you used the old domain to visit the pi finder. Please use <a href="https://pi-finder.xyz">pi-finder.xyz</a> in the future. <br>
                            Configurations of the old devices still work. But to be sure that your devices work in the future, please update the poke server in your configration: <code>pokeServer: "https://pi-finder.xyz"</code> <br>
                            You'll find the configuration file on your raspberry pi at "/usr/local/lib/node_modules/pi-finder/config.js".
                        </p>
                        <img src="/img/config_update.png" alt="Config Update" class="img-responsive">
                    </div>
                </div>
            </div>
        @endif
        <div class="row" v-if="noActiveDevices">
            <div class="col-md-10 col-md-offset-1">
                <div class="tile --shadow js-no-devices">
                    <h2>Nope!</h2>
                    <p class="lead">No Pi poked me recently.</p>
                </div>
                <div class="table-container">
                    <table class="table hidden" id="device-table">
                        @include('partials.device-table-header')
                    </table>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-md-10 col-md-offset-1">
                <div class="table-container">
                    <table class="table" id="device-table">
                        @include('partials.device-table-header')
                        <tr is="device"
                            v-for="device in devices | orderBy 'device_added' -1"
                            track-by="id"
                            :device="device"
                            :current-time="currentTime"
                        ></tr>
                    </table>
                </div>
            </div>

        </div> <!-- row -->

        <template id="device-template">
            <tr class="device-row" id="device-@{{ device.id }}">
                <td class="device-name">@{{ device.name }}</td>
                <td class="device-ip">@{{ device.ip }}</td>
                <td data-timestamp="@{{ device.device_added }}" class="device-created_at">@{{ creationTime }}</td>
                <td data-timestamp="@{{ device.last_contact }}" class="device-updated_at">@{{ relativeTime }}</td>
            </tr>
        </template>

    </div> <!-- container -->

@stop