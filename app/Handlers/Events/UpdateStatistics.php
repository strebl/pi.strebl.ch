<?php

namespace PiFinder\Handlers\Events;

use Carbon\Carbon;
use PiFinder\Poke;
use PiFinder\DeviceArchive;
use Illuminate\Support\Facades\DB;
use PiFinder\Events\ServerWasPoked;
use PiFinder\Utilities\ExtractNetwork;

class UpdateStatistics
{
    /**
     * Handle the event.
     *
     * @param ServerWasPoked $event
     *
     * @return void
     */
    public function handle(ServerWasPoked $event)
    {
        $device = $event->getDevice()->toArray();

        // device count
        DeviceArchive::updateOrCreate(
            ['mac_hash' => md5($device['mac'])],
            ['updated_at' => Carbon::now()]
        );

        // network distribution
        $network = ExtractNetwork::fromIp($device['ip']);
        DB::table('network_distribution')->where('network', $network)->increment('pokes');

        // pokes
        $date = Carbon::now()->toDateString();
        Poke::firstOrCreate(['date' => $date])->increment('pokes');
    }
}
