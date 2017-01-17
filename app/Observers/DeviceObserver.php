<?php

namespace PiFinder\Observers;

use Vinkla\Pusher\PusherManager;
use PiFinder\Transformers\DeviceTransformer;

class DeviceObserver
{
    /**
     * @var PusherManager
     */
    protected $pusher;

    /**
     * @var DeviceTransformer
     */
    private $transformer;

    /**
     * DeviceObserver constructor.
     *
     * @param PusherManager     $pusher
     * @param DeviceTransformer $transformer
     */
    public function __construct(PusherManager $pusher, DeviceTransformer $transformer)
    {
        $this->pusher = $pusher;
        $this->transformer = $transformer;
    }

    public function deleted($device)
    {
        $this->pusher->trigger(config('services.pusher.channel'), 'DeviceWasDeleted', [
            'device' => $this->transformer->transform($device),
        ]);
    }
}
