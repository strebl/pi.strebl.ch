@extends('layouts.master')

@section('content')
    <div class="container">
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
        
        <div id="app">
            <app></app>
        </div>

    </div> <!-- container -->

@stop
