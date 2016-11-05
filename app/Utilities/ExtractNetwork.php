<?php

namespace PiFinder\Utilities;

class ExtractNetwork
{
    /**
     * Extract the network from the ip address.
     *
     * @param string $ip
     *
     * @return string $network
     */
    public static function fromIp($ip)
    {
        if(starts_with($ip, '192.168.')) {
            return '192.168.0.0/16';
        }

        if(starts_with($ip, '10.')) {
            return '10.0.0.0/8';
        }

        if(preg_match('/^172\.(1[6-9]|2[0-9]|3[01])\./', $ip)) {
            return '172.16.0.0/12';
        }

        return 'Internet';
    }
}
