<?php

$I = new ApiTester($scenario);
$I->wantTo('create a new device');

$I->sendPOST('devices', [
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
$I->seeResponseCodeIs(422);
$I->seeResponseIsJson();

$I->sendPOST('devices', [
    'ip'   => '192.168.1.123',
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
$I->seeResponseCodeIs(201);
$I->seeHttpHeader('Location', 'http://localhost/api/v1/devices/1');
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'   => '192.168.1.123',
        'mac'  => '00:19:20:A1:B4:FC',
        'name' => 'Manuel',
    ],
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->seeRecord('devices', [
    'ip'   => '192.168.1.123',
    'mac'  => '00:19:20:A1:B4:FC',
    'name' => 'Manuel',
]);
