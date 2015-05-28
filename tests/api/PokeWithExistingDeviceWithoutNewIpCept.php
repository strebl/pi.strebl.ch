<?php

$I = new ApiTester($scenario);
$I->wantTo('poke the server with an existing device and a unchanged IP');

$initial_created_at = \Carbon\Carbon::now()->subHour();
$initial_updated_at = \Carbon\Carbon::now()->subHour();

$I->haveRecord('devices', [
    'ip'         => '192.168.1.123',
    'mac'        => '00:19:20:A1:B4:FC',
    'name'       => 'Manuel',
    'created_at' => $initial_created_at,
    'updated_at' => $initial_updated_at,
]);
$I->sendPOST('devices/poke', [
    'ip'   => '192.168.1.123',
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
$I->seeResponseCodeIs(200);
$I->seeHttpHeader('Location', 'http://localhost/api/v1/devices/1');
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.123',
        'mac'          => '00:19:20:A1:B4:FC',
        'name'         => 'Manuel',
        'on_home_page' => 'auto',
        'group'        => null,
    ],
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->seeRecord('devices', [
    'ip'     => '192.168.1.123',
    'mac'    => '00:19:20:A1:B4:FC',
    'name'   => 'Manuel',
    'public' => 'auto',
    'group'  => null,
]);
$I->seeRecord('pokes', [
    'ip'   => '192.168.1.123',
    'mac'  => '00:19:20:A1:B4:FC',
]);
$device = $I->grabRecord('devices', ['mac' => '00:19:20:A1:B4:FC']);
$created_at_after_poke = $I->carbonize($device->created_at);
$updated_at_after_poke = $I->carbonize($device->updated_at);

$I->assertTrue($updated_at_after_poke->gt($initial_updated_at),
    'The updated_at timestamp after the poke is greater than the initial updated_at timestamp');
$I->assertTrue($updated_at_after_poke->gt($initial_created_at),
    'The updated_at timestamp after the poke is greater than the initial created_at timestamp');
$I->assertTrue($created_at_after_poke->eq($initial_created_at),
    'The created_at timestamp after the poke is equal to the initial created_at timestamp');
