<?php

use PiFinder\Utilities\ExtractNetwork;

class ExtractNetworkTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function it_extracts_private_network_ranges()
    {
        // 172.16.0.0/12
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.16.0.0'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.17.2.0'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.18.16.0'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.19.244.0'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.20.22.4'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.21.24.45'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.22.32.34'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.23.11.13'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.24.76.56'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.25.67.12'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.26.0.1'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.27.52.0'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.28.13.22'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.29.13.1'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.30.233.1'));
        $this->assertEquals('172.16.0.0/12', ExtractNetwork::fromIp('172.31.11.1'));

        // 192.168.0.0/16
        $this->assertEquals('192.168.0.0/16', ExtractNetwork::fromIp('192.168.0.0'));
        $this->assertEquals('192.168.0.0/16', ExtractNetwork::fromIp('192.168.128.64'));
        $this->assertEquals('192.168.0.0/16', ExtractNetwork::fromIp('192.168.254.254'));

        // 10.0.0.0/8
        $this->assertEquals('10.0.0.0/8', ExtractNetwork::fromIp('10.0.0.0'));
        $this->assertEquals('10.0.0.0/8', ExtractNetwork::fromIp('10.2.4.5'));
        $this->assertEquals('10.0.0.0/8', ExtractNetwork::fromIp('10.10.10.10'));
        $this->assertEquals('10.0.0.0/8', ExtractNetwork::fromIp('10.254.2.20'));

        // Internet
        $this->assertEquals('Internet', ExtractNetwork::fromIp('172.32.0.10'));
        $this->assertEquals('Internet', ExtractNetwork::fromIp('192.169.0.0'));
        $this->assertEquals('Internet', ExtractNetwork::fromIp('86.123.12.1'));
        $this->assertEquals('Internet', ExtractNetwork::fromIp('8.88.88.123'));
    }
}
