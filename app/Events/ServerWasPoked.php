<?php

namespace PiFinder\Events;

use Illuminate\Queue\SerializesModels;
use PiFinder\Device;

class ServerWasPoked extends Event
{
    use SerializesModels;

    /**
     * @var Device
     */
    protected $device;

    /**
     * Create a new event instance.
     *
     * @param Device $device
     */
    public function __construct(Device $device)
    {
        //
        $this->device = $device;
    }

    /**
     * @return Device
     */
    public function getDevice()
    {
        return $this->device;
    }
}
