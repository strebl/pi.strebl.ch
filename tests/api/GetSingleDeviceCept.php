<?php

$I = new ApiTester($scenario);
$I->wantTo('get a single device');

$piOne = $I->haveRecord('devices', [
    'ip'         => '192.168.1.101',
    'mac'        => '11:22:33:44:55:66',
    'name'       => 'Awesome Pi One',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);

$piTwo = $I->haveRecord('devices', [
    'ip'         => '192.168.1.102',
    'mac'        => 'AA:BB:CC:DD:EE:FF',
    'name'       => 'Awesome Pi Two',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);

$I->sendGET('devices/1');
$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'   => '192.168.1.101',
        'mac'  => '11:22:33:44:55:66',
        'name' => 'Awesome Pi One',
    ],
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->dontSeeResponseContainsJson([
    'data' => [
        'ip'   => '192.168.1.102',
        'mac'  => 'AA:BB:CC:DD:EE:FF',
        'name' => 'Awesome Pi Two',
    ],
]);

$I->sendGET('devices/100');
$I->seeResponseCodeIs(404);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'errors' => [
        'title'  => 'Did not find the device you are looking for!',
        'status' => 404,
    ],
]);
