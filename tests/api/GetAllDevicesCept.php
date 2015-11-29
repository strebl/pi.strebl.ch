<?php

$I = new ApiTester($scenario);
$I->wantTo('list all devices');

$I->haveRecord('devices', [
    'ip'         => '192.168.1.101',
    'mac'        => '11:22:33:44:55:66',
    'name'       => 'Public Pi',
    'public'     => 'true',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piOne = $I->grabRecord('devices', ['ip' => '192.168.1.101']);

$piTwo = $I->haveRecord('devices', [
    'ip'         => '192.168.1.102',
    'mac'        => 'AA:BB:CC:DD:EE:FF',
    'name'       => 'Private Pi',
    'public'     => 'false',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piTwo = $I->grabRecord('devices', ['ip' => '192.168.1.102']);

$piThree = $I->haveRecord('devices', [
    'ip'         => '192.168.1.103',
    'mac'        => 'AA:11:BB:22:CC:33',
    'name'       => 'Auto Pi without group',
    'public'     => 'auto',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piThree = $I->grabRecord('devices', ['ip' => '192.168.1.103']);

$piFour = $I->haveRecord('devices', [
    'ip'         => '192.168.1.104',
    'mac'        => 'DD:44:EE:55:FF:66',
    'name'       => 'Auto Pi with group',
    'public'     => 'auto',
    'group'      => 'my-group',
    'created_at' => new DateTime(),
    'updated_at' => new DateTime(),
]);
$piFour = $I->grabRecord('devices', ['ip' => '192.168.1.104']);

$I->sendGET('devices');
$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.101',
        'name'         => 'Public Pi',
        'on_home_page' => 'true',
        'group'        => null,
        'device_added' => \Carbon\Carbon::parse($piOne->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piOne->updated_at)->toIso8601String(),
    ],
]);
$I->dontSeeResponseContainsJson([
    'data' => [
        'ip'           => '192.168.1.102',
        'name'         => 'Private Pi',
        'on_home_page' => 'false',
        'group'        => null,
        'device_added' => \Carbon\Carbon::parse($piTwo->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piTwo->updated_at)->toIso8601String(),
    ],
]);
$I->seeResponseContainsJson([
    'data' => [
        'ip'         => '192.168.1.103',
        'name'       => 'Auto Pi without group',
        'on_home_page' => 'auto',
        'group'        => null,
        'device_added' => \Carbon\Carbon::parse($piTwo->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piTwo->updated_at)->toIso8601String(),
    ],
]);

$I->dontSeeResponseContainsJson([
    'data' => [
        'ip'         => '192.168.1.104',
        'name'       => 'Auto Pi with group',
        'on_home_page' => 'auto',
        'group'        => 'my-group',
        'device_added' => \Carbon\Carbon::parse($piTwo->created_at)->toIso8601String(),
        'last_contact' => \Carbon\Carbon::parse($piTwo->updated_at)->toIso8601String(),
    ],
]);

$I->sendGET('devices/@my-group');
$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'data' => ['name' => 'Auto Pi with group'],
]);
$I->dontSeeResponseContainsJson([
    'data' => ['name' => 'Auto Pi without group'],
]);
$I->dontSeeResponseContainsJson([
    'data' => ['name' => 'Private Pi'],
]);
$I->dontSeeResponseContainsJson([
    'data' => ['name' => 'Public Pi'],
]);