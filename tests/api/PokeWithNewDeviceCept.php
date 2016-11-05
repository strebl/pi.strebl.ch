<?php

$I = new ApiTester($scenario);
$I->wantTo('poke the server with a new device');

$I->sendPOST('devices/poke', [
    'ip'   => '192.168.1.123',
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
$I->seeResponseCodeIs(200);
$I->seeHttpHeader('Location', 'http://pi-finder.xyz/api/v1/devices/1');
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.123',
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
    'ip'   => '192.168.0.0/16',
    'mac'  => '00:19:20:A1:B4:FC',
]);
