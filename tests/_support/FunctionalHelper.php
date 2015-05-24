<?php

namespace Codeception\Module;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class FunctionalHelper extends \Codeception\Module
{
    private $artisan;

    public function _beforeStep()
    {
        $this->artisan()->call('migrate');
    }

    public function runConsoleCommand($command, $parameter = [])
    {
        $this->debug('MIGRATING BEFORE RUN');

        $artisan = $this->artisan();
        $artisan->call($command, $parameter);

        $this->artisan = $artisan;
    }

    public function seeInLastCommandOutput($search)
    {
        $output = $this->artisan->output();

        $this->assertContains($search, $output);
    }

    private function artisan()
    {
        return $this->getModule('Laravel5')
            ->grabService('PiFinder\Console\Kernel');
    }
}
