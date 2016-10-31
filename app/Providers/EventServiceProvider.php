<?php

namespace PiFinder\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event handler mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'PiFinder\Events\ServerWasPoked' => [
            'PiFinder\Handlers\Events\NotifyUsersAboutPoke',
            'PiFinder\Handlers\Events\UpdateStatistics',
        ],
    ];

    /**
     * Register any other events for your application.
     *
     * @param \Illuminate\Contracts\Events\Dispatcher $events
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
