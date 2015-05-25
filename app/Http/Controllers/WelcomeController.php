<?php

namespace PiFinder\Http\Controllers;

use DB;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Filesystem\Filesystem;
use JavaScript;
use PiFinder\Device;
use PiFinder\Poke;
use PiFinder\Services\MarkdownParser;
use PiFinder\Services\Statistics;

class WelcomeController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Welcome Controller
    |--------------------------------------------------------------------------
    |
    | This controller renders the "marketing page" for the application and
    | is configured to only allow guests. Like most of the other sample
    | controllers, you are free to modify or remove it as you desire.
    |
    */

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application welcome screen to the user.
     *
     * @return Response
     */
    public function index()
    {
        $devices = Device::all();

        return view('overview')->with(compact('devices'));
    }

    /**
     * Show the getting started screen to the user.
     *
     * @param MarkdownParser $markdown
     * @param Cache          $cache
     * @param Filesystem     $file
     *
     * @return Response
     */
    public function gettingStarted(MarkdownParser $markdown, Cache $cache, Filesystem $file)
    {
        $gettingStarted = $cache->remember('getting-started', 5, function () use ($markdown, $file) {

            $gettingStarted = $file->get(base_path('resources/getting-started/readme.md'));

            return $markdown->parse($gettingStarted);
        });

        return view('getting-started')->with(compact('gettingStarted'));
    }

    /**
     * Show the statistics screen to the user.
     *
     * @return Response
     */
    public function statistics(Statistics $statistics)
    {
        $pokes_total = $statistics->totalPokes();

        $devices_total = $statistics->totalDevices();

        $pokes = $statistics->allPokes()->toArray();

        $network_distribution = $statistics->networkDistribution()->toArray();

        JavaScript::put(compact('pokes', 'network_distribution'));

        return view('statistics')->with(compact('pokes_total', 'devices_total'));
    }
}
