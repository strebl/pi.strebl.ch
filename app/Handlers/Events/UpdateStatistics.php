<?php

namespace PiFinder\Handlers\Events;

use PiFinder\Events\ServerWasPoked;
use PiFinder\Poke;

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
        Poke::create($event->getDevice()->toArray());
    }
}
