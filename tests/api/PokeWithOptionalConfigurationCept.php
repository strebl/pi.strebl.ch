<?php

use Carbon\Carbon;

$I = new ApiTester($scenario);
$I->wantTo('poke with optional configuration parameters');

$now = Carbon::now()->subYears(20);
Carbon::setTestNow($now);

$currentNetworkDistribution = \DB::table('network_distribution')->where('network', '192.168.0.0/16')->first()->pokes;

$I->sendPOST('devices/poke', [
    'ip'     => '192.168.1.123',
    'mac'    => '00:19:20:A1:B4:FC',
    'name'   => 'Manuel',
    'public' => 'false',
    'group'  => 'strebl',
]);
$I->seeResponseCodeIs(200);
$I->seeHttpHeader('Location', 'http://pi-finder.xyz/api/v1/devices/1');
$I->seeResponseIsJson();

$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.123',
        'name'         => 'Manuel',
        'on_home_page' => 'false',
        'group'        => 'strebl',
    ],
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->seeRecord('devices', [
    'ip'     => '192.168.1.123',
    'mac'    => '00:19:20:A1:B4:FC',
    'name'   => 'Manuel',
    'public' => 'false',
    'group'  => 'strebl',
]);
$I->seeRecord('pokes', [
    'date'   => $now->toDateString(),
    'pokes'  => 1,
]);
$I->seeRecord('network_distribution', [
    'network' => '192.168.0.0/16',
    'pokes'   => $currentNetworkDistribution + 1,
]);
$I->seeRecord('device_archive', [
    'mac_hash'   => md5('00:19:20:A1:B4:FC'),
    'updated_at' => $now,
]);
