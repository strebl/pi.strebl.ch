<?php

namespace App\Console\Commands;

use App\Device;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FlushOldDevices extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'pi:flush';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove all devices from the list which don\'t poked us in the last 15 minutes.';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function fire()
    {
        $affectedRows = $this->getDevices();

        $message = $this->getMessage($affectedRows);

        $this->info($message);
    }

    /**
     * @param $affectedRows
     *
     * @return string
     */
    public function getMessage($affectedRows)
    {
        $message = "Deleted $affectedRows device".($affectedRows == 1 ? '' : 's').'.';

        return $message;
    }

    /**
     * Get all devices which should get deleted.
     *
     * @return mixed
     */
    public function getDevices()
    {
        $date = Carbon::now()->subMinutes(15);

        $affectedRows = Device::where('updated_at', '<', $date)->delete();

        return $affectedRows;
    }
}
