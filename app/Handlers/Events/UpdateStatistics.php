<?php

namespace PiFinder\Handlers\Events;

use PiFinder\Events\ServerWasPoked;
use PiFinder\Poke;
use PiFinder\Utilities;
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
        $device['ip'] = ExtractNetwork::fromIp($device['ip']);

        Poke::create($device);
    }
}
