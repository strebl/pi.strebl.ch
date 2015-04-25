<?php namespace PiFinder\Handlers\Events;

use PiFinder\Events\ServerWasPoked;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldBeQueued;
use Vinkla\Pusher\PusherManager;

class NotifyUsersAboutPoke {

	/**
	 * The Pusher instance.
	 *
	 * @var PusherManager
	 */
	protected $pusher;

	/**
	 * Create the event handler.
	 *
	 * @param PusherManager $pusher
	 */
	public function __construct(PusherManager $pusher)
	{
		$this->pusher = $pusher;
	}

	/**
	 * Handle the server was poked event.
	 *
	 * @param  ServerWasPoked  $event
	 *
	 * @return void
	 */
	public function handle(ServerWasPoked $event)
	{
		$this->pusher->trigger('pi-finder', 'ServerWasPoked', ['device' => $event->getDevice()->toArray()]);
	}

}
