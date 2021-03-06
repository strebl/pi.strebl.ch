<?php

namespace PiFinder\Transformers;

class DeviceTransformer extends Transformer
{
    public function transform($device)
    {
        return [
            'id'            => $device['id'],
            'ip'            => $device['ip'],
            'name'          => $device['name'],
            'group'         => $device['group'],
            'on_home_page'  => $device['public'],
            'device_added'  => $device['created_at']->toIso8601String(),
            'last_contact'  => $device['updated_at']->toIso8601String(),
        ];
    }
}
