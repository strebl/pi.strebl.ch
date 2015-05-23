<?php

namespace PiFinder\Providers;

use Illuminate\Support\ServiceProvider;
use PiFinder\Services\Registrar;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind(
            'Illuminate\Contracts\Auth\Registrar',
            Registrar::class
        );
    }
}
