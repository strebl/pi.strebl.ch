<?php

namespace PiFinder\Console\Commands;

use Illuminate\Console\Command;
use PiFinder\Services\Registrar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class UserCreate extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'user:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a user.';

    /**
     * The registrar implementation.
     *
     * @var Registrar
     */
    private $registrar;

    /**
     * Create a new command instance.
     *
     * @param Registrar $registrar
     */
    public function __construct(Registrar $registrar)
    {
        parent::__construct();

        $this->registrar = $registrar;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function fire()
    {
        $email = $this->argument('email');
        $password = $this->option('password');
        $password_confirmation = $this->option('password_confirmation');

        if (! $password) {
            $password = $this->secret('What password should the user have?');
        }

        if (! $password_confirmation) {
            $password_confirmation = $this->secret('Please confirm the password.');
        }

        $this->registrar->create(compact('email', 'password', 'password_confirmation'));
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['email', InputArgument::REQUIRED, 'The email address of the user.'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['password', null, InputOption::VALUE_OPTIONAL, 'The password for the user.', null],
            ['password_confirmation', null, InputOption::VALUE_OPTIONAL, 'Password confirmation.', null],
        ];
    }
}
