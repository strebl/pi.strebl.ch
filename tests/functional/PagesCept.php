<?php

$I = new FunctionalTester($scenario);
$I->wantTo('visit all pages');

$I->amGoingTo('visit the home page');

$I->amOnPage('/');

$I->seeResponseCodeIs(200);
$I->see('Nope');

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
