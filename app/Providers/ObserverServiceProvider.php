<?php namespace PiFinder\Providers;

use Illuminate\Support\ServiceProvider;
use PiFinder\Device;

class ObserverServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		Device::observe(app('PiFinder\Observers\DeviceObserver'));
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}

}
