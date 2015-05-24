<?php

$I = new ApiTester($scenario);
$I->wantTo('update a device');

$user = $I->haveAnAccount();

$I->amHttpAuthenticated($user['email'], $user['password']);

$created_at = \Carbon\Carbon::now()->subHour();
$updated_at = \Carbon\Carbon::now()->subHour();

$I->haveRecord('devices', [
    'ip'         => '192.168.1.101',
    'mac'        => '11:22:33:44:55:66',
    'name'       => 'Awesome Pi One',
    'created_at' => $created_at,
    'updated_at' => $updated_at,
]);

$I->sendPATCH('devices/1', [
    'ip'   => '192.168.1.102',
    'mac'  => 'AA:BB:CC:DD:EE:FF',
    'name' => 'Updated Awesome Pi One',
]);

$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContainsJson([
    'ip'   => '192.168.1.102',
    'mac'  => 'AA:BB:CC:DD:EE:FF',
    'name' => 'Updated Awesome Pi One',
]);
$I->seeResponseJsonMatchesXpath('//data//device_added');
$I->seeResponseJsonMatchesXpath('//data//last_contact');
$I->canSeeRecord('devices', [
    'ip'   => '192.168.1.102',
    'mac'  => 'AA:BB:CC:DD:EE:FF',
    'name' => 'Updated Awesome Pi One',
]);
$updatedDevice = $I->grabRecord('devices', ['ip' => '192.168.1.102']);
$I->cantSeeRecord('devices', [
    'ip'   => '192.168.1.101',
    'mac'  => '11:22:33:44:55:66',
    'name' => 'Awesome Pi One',
]);
$updated_created_at_timestamp = $I->carbonize($updatedDevice->created_at);
$updated_updated_at_timestamp = $I->carbonize($updatedDevice->updated_at);
$I->assertTrue($updated_created_at_timestamp->eq($created_at),
    'Updated created_at timestamp is equal to the initial created_at timestamp');
$I->assertTrue($updated_updated_at_timestamp->gt($updated_at),
    'Updated updated_at timestamp is greater than the initial updated_at timestamp');
$I->assertTrue($updated_updated_at_timestamp->gt($created_at),
    'Updated updated_at timestamp is greater than the initial created_at timestamp');

$I->sendPATCH('devices/100', [
    'ip'   => '192.168.1.102',
    'mac'  => 'AA:BB:CC:DD:EE:FF',
    'name' => 'Updated Awesome Pi One',
]);
$I->seeResponseCodeIs(404);
$I->seeResponseIsJson();
