<?php

$I = new FunctionalTester($scenario);
$I->wantTo('visit all pages');

$I->amGoingTo('visit the home page');

$I->amOnPage('/');

$I->seeResponseCodeIs(200);
$I->see('Nope');

$I->haveRecord('devices', [
    'ip'         => '192.168.1.123',
    'mac'        => '00:19:20:A1:B4:FC',
    'name'       => 'My Awesome Pi One',
    'public'     => 'auto',
    'group'      => 'strebl',
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->haveRecord('devices', [
    'ip'         => '192.168.1.124',
    'mac'        => '00:19:20:A1:B4:FD',
    'name'       => 'My Awesome Pi Two',
    'public'     => 'false',
    'group'      => 'strebl',
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->haveRecord('devices', [
    'ip'         => '192.168.1.125',
    'mac'        => '00:19:20:A1:B4:FE',
    'name'       => 'My Awesome Pi Three',
    'public'     => 'true',
    'group'      => 'strebl',
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->haveRecord('devices', [
    'ip'         => '192.168.2.123',
    'mac'        => '00:19:20:A1:B5:FC',
    'name'       => 'My Awesome Pi Four',
    'public'     => 'auto',
    'group'      => null,
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->haveRecord('devices', [
    'ip'         => '192.168.2.124',
    'mac'        => '00:19:20:A1:B5:FD',
    'name'       => 'My Awesome Pi Five',
    'public'     => 'false',
    'group'      => null,
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->haveRecord('devices', [
    'ip'         => '192.168.2.125',
    'mac'        => '00:19:20:A1:B5:FE',
    'name'       => 'My Awesome Pi Six',
    'public'     => 'true',
    'group'      => null,
    'created_at' => \Carbon\Carbon::now(),
    'updated_at' => \Carbon\Carbon::now(),
]);

$I->amOnPage('/');

$I->seeResponseCodeIs(200);

$I->see('Devices');

$I->dontSee('My Awesome Pi One');
$I->dontSee('My Awesome Pi Two');
$I->see('My Awesome Pi Three');
$I->see('My Awesome Pi Four');
$I->dontSee('My Awesome Pi Five');
$I->see('My Awesome Pi Six');

$I->amGoingTo('visit the group page');

$I->amOnPage('/@strebl');

$I->see('Devices');
$I->see('strebl');

$I->see('My Awesome Pi One');
$I->see('My Awesome Pi Two');
$I->see('My Awesome Pi Three');
$I->dontSee('My Awesome Pi Four');
$I->dontSee('My Awesome Pi Five');
$I->dontSee('My Awesome Pi Six');

$I->amGoingTo('visit the getting started page');

$I->amOnPage('/getting-started');

$I->seeResponseCodeIs(200);
$I->see('Introduction');
$I->see('Installation');

$I->amGoingTo('visit the statistics page');

$I->amOnPage('/stats');

$I->seeResponseCodeIs(200);
$I->see('Total Pokes');
$I->see('Total Devices');
