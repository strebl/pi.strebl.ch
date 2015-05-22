<?php

namespace Codeception\Module;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class FunctionalHelper extends \Codeception\Module
{
    public function _beforeStep()
    {
        $this->debug('MIGRATING BEFORE RUN');
        $this->getModule('Laravel5')
            ->grabService('PiFinder\Console\Kernel')
            ->call('migrate');
    }
}
