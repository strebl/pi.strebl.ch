<?php

namespace PiFinder\Services;

use Carbon\Carbon;
use DB;
use PiFinder\DeviceArchive;
use PiFinder\Poke;

class Statistics
{
    /**
     * Returns the count of all pokes.
     *
     * @return mixed
     */
    public function totalPokes()
    {
        $base = 189771;

        return DB::table('network_distribution')->sum('pokes') + $base;
    }

    /**
     * Returns the the count of all devices.
     *
     * @return mixed
     */
    public function totalDevices()
    {
        return DeviceArchive::count();
    }

    /**
     * Returns all pokes.
     *
     * @return mixed
     */
    public function allPokes()
    {
        return Poke::all();
    }

    /**
     * Returns a collection of all networks and it's count.
     *
     * @return mixed
     */
    public function networkDistribution()
    {
        $data = DB::table('network_distribution')
            ->select('network as label', 'pokes as value')
            ->get();

        return $this->addColors($data);
    }

    private function addColors($data)
    {
        $colors = ['rgb(23,103,153)', 'rgb(47,135,176)', 'rgb(66,164,187)', 'rgb(91,192,196)'];
        $highlight_colors = ['#8BB3CC', '#97C3D7', '#ADDFE1', '#BBEAE3'];

        return $data->each(function ($network, $i) use ($colors, $highlight_colors) {
            $network->color = $colors[$i];
            $network->highlight = $highlight_colors[$i];
        });
    }
}
