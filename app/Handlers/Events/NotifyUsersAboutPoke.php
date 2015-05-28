<?php

namespace PiFinder\Handlers\Events;

use PiFinder\Events\ServerWasPoked;
use Vinkla\Pusher\PusherManager;

class NotifyUsersAboutPoke
{
    /**
     * The Pusher instance.
     *
     * @var PusherManager
     */
    protected $pusher;

    /**
     * Create the event handler.
     *
     * @param PusherManager $pusher
     */
    public function __construct(PusherManager $pusher)
    {
        $this->pusher = $pusher;
    }

    /**
     * Handle the server was poked event.
     *
     * @param ServerWasPoked $event
     *
     * @return void
     */
    public function handle(ServerWasPoked $event)
    {
        $channel = env('PUSHER_CHANNEL', 'pi-finder');
        $device = $event->getDevice();

        if ($device->isPublic()) {
            $this->pusher->trigger($channel, 'ServerWasPoked', ['device' => $device->toArray()]);
        } else {
            $channel = $channel.'-'.$device->group;

            $this->pusher->trigger($channel, 'ServerWasPoked', ['device' => $device->toArray()]);
        }
    }
}
