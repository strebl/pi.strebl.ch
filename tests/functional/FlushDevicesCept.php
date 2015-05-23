<?php 
$I = new FunctionalTester($scenario);
$I->wantTo('flush old devices');

$piOne = [
    'ip'         => '192.168.1.101',
    'mac'        => '11:22:33:44:55:66',
    'name'       => 'Awesome Pi One',
    'created_at' => (new \Carbon\Carbon())->subHour()->toDateTimeString(),
    'updated_at' => (new \Carbon\Carbon())->subHour()->toDateTimeString(),
];
$I->haveRecord('devices', $piOne);

$piTwo = [
    'ip'         => '192.168.1.102',
    'mac'        => '11:22:33:44:55:67',
    'name'       => 'Awesome Pi Two',
    'created_at' => (new \Carbon\Carbon())->subHour()->toDateTimeString(),
    'updated_at' => (new \Carbon\Carbon())->now()->toDateTimeString(),
];
$I->haveRecord('devices', $piTwo);

$I->assertEquals(2, \PiFinder\Device::count());

$I->runConsoleCommand('pi:flush');

$I->assertEquals(1, \PiFinder\Device::count());

$I->dontSeeRecord('devices', $piOne);

$I->seeRecord('devices', $piTwo);