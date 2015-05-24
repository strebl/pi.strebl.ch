<?php

$I = new ApiTester($scenario);
$I->wantTo('list all devices');

$user = $I->haveAnAccount();

$I->amHttpAuthenticated($user['email'], $user['password']);

$I->haveRecord('devices', [
    'ip'         => '192.168.1.101',
    'mac'        => '11:22:33:44:55:66',
    'name'       => 'Awesome Pi One',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piOne = $I->grabRecord('devices', ['ip' => '192.168.1.101']);

$piTwo = $I->haveRecord('devices', [
    'ip'         => '192.168.1.102',
    'mac'        => 'AA:BB:CC:DD:EE:FF',
    'name'       => 'Awesome Pi Two',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piTwo = $I->grabRecord('devices', ['ip' => '192.168.1.102']);

$I->sendGET('devices');
$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.101',
        'mac'          => '11:22:33:44:55:66',
        'name'         => 'Awesome Pi One',
        'device_added' => \Carbon\Carbon::parse($piOne->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piOne->updated_at)->toIso8601String(),
    ],
]);
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.102',
        'mac'          => 'AA:BB:CC:DD:EE:FF',
        'name'         => 'Awesome Pi Two',
        'device_added' => \Carbon\Carbon::parse($piTwo->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piTwo->updated_at)->toIso8601String(),
    ],
]);
