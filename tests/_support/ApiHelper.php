<?php

namespace Codeception\Module;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

use Carbon\Carbon;

class ApiHelper extends \Codeception\Module
{
    private $artisan;

    public function _before(\Codeception\Testcase $test)
    {
        $this->artisan()->call('migrate');
    }

    private function artisan()
    {
        return $this->getModule('Laravel5')
            ->grabService('PiFinder\Console\Kernel');
    }

    public function carbonize($date)
    {
        return Carbon::parse($date);
    }

    public function haveAnAccount()
    {
        $user = [
            'email'    => 'manuel@strebl.ch',
            'password' => 'password',
        ];

        $this->getModule('Laravel5')->grabService('PiFinder\Services\Registrar')->create($user);

        return $user;
    }
}
