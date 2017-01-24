<?php

namespace PiFinder\Providers;

use AltThree\Bus\Dispatcher;
use Illuminate\Support\ServiceProvider;

class BusServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @param \Illuminate\Bus\Dispatcher $dispatcher
     */
    public function boot(Dispatcher $dispatcher)
    {
        $dispatcher->mapUsing(function ($command) {
            return Dispatcher::simpleMapping(
                $command,
                \PiFinder\Commands::class,
                \PiFinder\Handlers\Commands::class
            );
        });
    }

    /**
     * Register any application services.
     */
    public function register()
    {
        //
    }
}
