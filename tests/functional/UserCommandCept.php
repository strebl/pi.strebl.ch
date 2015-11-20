<?php

$I = new FunctionalTester($scenario);
$I->wantTo('create and delete a user');

$user = [
    'email'                 => 'manuel@strebl.ch',
    'password'              => 'password',
    'password_confirmation' => 'password',
];
$I->dontSeeRecord('users', ['email' => 'manuel@strebl.ch']);
$parameter = [
    'email'                   => $user['email'],
    '--password'              => $user['password'],
    '--password_confirmation' => $user['password_confirmation'],
];

$I->runConsoleCommand('user:create', array_replace($parameter, ['email' => 'invalidformat']));
$I->dontSeeRecord('users', ['email' => 'manuel@strebl.ch']);

$I->runConsoleCommand('user:create', $parameter);
$I->seeRecord('users', ['email' => 'manuel@strebl.ch']);

$I->runConsoleCommand('user:delete', ['email' => 'wrong@mail.com']);
$I->seeInLastCommandOutput('Did not find a user with');

$I->runConsoleCommand('user:delete', ['email' => 'manuel@strebl.ch']);
$I->dontSeeRecord('users', ['email' => 'manuel@strebl.ch']);
