<?php

namespace PiFinder\Services;

use DB;
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

        return Poke::count() + $base;
    }

    /**
     * Returns the the count of all devices.
     *
     * @return mixed
     */
    public function totalDevices()
    {
        return Poke::distinct()->count('mac');
    }

    /**
     * Returns all pokes.
     *
     * @return mixed
     */
    public function allPokes()
    {
        return Poke::select(
            DB::raw('count(*) as pokes, date(created_at) as date')
        )
            ->groupBy('date')
            ->get();
    }

    /**
     * Returns a collection of all networks and it's count.
     *
     * @return mixed
     */
    public function networkDistribution()
    {
        $data = Poke::select(
            DB::raw("ip as label, count(ip) as value")
            )
            ->groupBy('label')
            ->orderBy('label')
            ->get();

        return $this->addColors($data);
    }

    private function addColors($data)
    {
        $colors = ['rgb(23,103,153)', 'rgb(47,135,176)', 'rgb(66,164,187)', 'rgb(91,192,196)'];
        $highlight_colors = ['#8BB3CC', '#97C3D7', '#ADDFE1', '#BBEAE3'];
        foreach ($data as $i => $network) {
            $network['color'] = $colors[$i];
            $network['highlight'] = $highlight_colors[$i];
        }

        return $data;
    }
}
