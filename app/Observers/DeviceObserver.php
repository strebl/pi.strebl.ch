<?php

namespace PiFinder\Observers;

use Vinkla\Pusher\PusherManager;

class DeviceObserver
{
    /**
     * @var PusherManager
     */
    protected $pusher;

    /**
     * DeviceObserver constructor.
     */
    public function __construct(PusherManager $pusher)
    {
        $this->pusher = $pusher;
    }

    public function deleted($device)
    {
        $this->pusher->trigger(env('PUSHER_CHANNEL', 'pi-finder'), 'DeviceWasDeleted', ['device' => $device->toArray()]);
    }
}
