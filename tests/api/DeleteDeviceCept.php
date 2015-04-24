<?php

$I = new ApiTester($scenario);
$I->wantTo('delete a device');

$piOne = $I->haveRecord('devices', [
    'ip' => '192.168.1.101',
    'mac' => '11:22:33:44:55:66',
    'name' => 'Awesome Pi One',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);

$I->sendDELETE('devices/1');
$I->seeResponseCodeIs(204);
$I->seeResponseIsJson();
$I->cantSeeRecord('devices', ['ip' => '192.168.1.101']);
