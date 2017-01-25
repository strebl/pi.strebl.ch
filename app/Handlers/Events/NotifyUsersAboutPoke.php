<?php

namespace PiFinder\Handlers\Events;

use Vinkla\Pusher\PusherManager;
use PiFinder\Events\ServerWasPoked;
use PiFinder\Transformers\DeviceTransformer;

class NotifyUsersAboutPoke
{
    /**
     * The Pusher instance.
     *
     * @var PusherManager
     */
    protected $pusher;

    /**
     * @var DeviceTransformer
     */
    private $transformer;

    /**
     * Create the event handler.
     *
     * @param PusherManager     $pusher
     * @param DeviceTransformer $transformer
     */
    public function __construct(PusherManager $pusher, DeviceTransformer $transformer)
    {
        $this->pusher = $pusher;
        $this->transformer = $transformer;
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
        $channel = config('broadcasting.connections.pusher.channel');
        $device = $event->getDevice();

        if ($device->isPublic()) {
            $this->pusher->trigger($channel, 'ServerWasPoked', [
                'device' => $this->transformer->transform($device),
            ]);
        } else {
            $channel = $channel.'-'.$device->group;

            $this->pusher->trigger($channel, 'ServerWasPoked', [
                'device' => $this->transformer->transform($device),
            ]);
        }
    }
}
