<?php namespace PiFinder\Handlers\Events;

use PiFinder\Events\ServerWasPoked;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldBeQueued;
use PiFinder\Poke;

class UpdateStatistics
{

    /**
     * Handle the event.
     *
     * @param  ServerWasPoked  $event
     * @return void
     */
    public function handle(ServerWasPoked $event)
    {
        Poke::create($event->getDevice()->toArray());
    }
}
