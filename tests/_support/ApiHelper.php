<?php

namespace Codeception\Module;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

use Carbon\Carbon;

class ApiHelper extends \Codeception\Module
{
    public function _before()
    {
        $this->debug('MIGRATING BEFORE RUN');
        $this->getModule('Laravel5')
             ->grabService('PiFinder\Console\Kernel')
             ->call('migrate');
    }

    public function carbonize($date)
    {
        return Carbon::parse($date);
    }
}
