<?php

namespace PiFinder\Observers;

use PiFinder\Transformers\DeviceTransformer;
use Vinkla\Pusher\PusherManager;

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
        $this->pusher->trigger(env('PUSHER_CHANNEL', 'pi-finder'), 'DeviceWasDeleted', [
            'device' => $this->transformer->transform($device),
        ]);
    }
}
