<?php

namespace PiFinder\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use PiFinder\User;
use Symfony\Component\Console\Input\InputArgument;

class UserDelete extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'user:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a user.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function fire()
    {
        $email = $this->argument('email');

        try {
            $user = User::whereEmail($email)->firstOrFail();
            $user->delete();

            $this->info('User deleted.');
        } catch (ModelNotFoundException $e) {
            $this->error('Did not find a user with the given email address');
        }
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
}
