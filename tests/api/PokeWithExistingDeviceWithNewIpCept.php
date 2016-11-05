<?php

use Carbon\Carbon;

$I = new ApiTester($scenario);
$I->wantTo('poke the server with an existing device and a new IP');

$now = Carbon::now()->subYears(20);
Carbon::setTestNow($now);

$initial_created_at = \Carbon\Carbon::now()->subHour();
$initial_created_at->second($initial_created_at->second);
$initial_updated_at = \Carbon\Carbon::now()->subHour();
$initial_updated_at->second($initial_updated_at->second);

$I->haveRecord('devices', [
    'ip'         => '192.168.1.123',
    'mac'        => '00:19:20:A1:B4:FC',
    'name'       => 'Manuel',
    'created_at' => $initial_created_at,
    'updated_at' => $initial_updated_at,
]);
$I->sendPOST('devices/poke', [
    'ip'   => '192.168.1.100',
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
$I->seeResponseCodeIs(200);
$I->seeHttpHeader('Location', 'http://pi-finder.xyz/api/v1/devices/1');
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.100',
        'name'         => 'Manuel',
        'on_home_page' => 'auto',
        'group'        => null,
    ],
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->seeRecord('devices', [
    'ip'     => '192.168.1.100',
    'mac'    => '00:19:20:A1:B4:FC',
    'name'   => 'Manuel',
    'public' => 'auto',
    'group'  => null,
]);
$I->seeRecord('pokes', [
    'date'   => $now->toDateString(),
    'pokes'  => 1,
]);
$device = $I->grabRecord('devices', ['mac' => '00:19:20:A1:B4:FC']);
$created_at_after_poke = $I->carbonize($device['created_at']);
$created_at_after_poke->second($created_at_after_poke->second);
$updated_at_after_poke = $I->carbonize($device['updated_at']);
$updated_at_after_poke->second($updated_at_after_poke->second);

$I->assertTrue($updated_at_after_poke->gt($initial_updated_at),
    'The updated_at timestamp after the poke is greater than the initial updated_at timestamp');
$I->assertTrue($updated_at_after_poke->gt($initial_created_at),
    'The updated_at timestamp after the poke is greater than the initial created_at timestamp');
$I->assertTrue($created_at_after_poke->eq($initial_created_at),
    'The created_at timestamp after the poke is equal to the initial created_at timestamp');
