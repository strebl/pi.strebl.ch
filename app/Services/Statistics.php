<?php

namespace PiFinder\Services;

use DB;
use PiFinder\Poke;

class Statistics {

    public function totalPokes()
    {
        $base = 189771;

        return Poke::count() + $base;
    }

    public function totalDevices()
    {
        return Poke::distinct()->count('mac');
    }

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
        $this->createSqliteRegexpFunction();

        $data = Poke::select(
            DB::raw("
                CASE
                    WHEN ip LIKE '192.168.%'
                        THEN '192.168.0.0/16'
                    WHEN (ip REGEXP '/^172\.(1[6-9]|2[0-9]|3[01])\./')
                        THEN '172.16.0.0/12'
                    WHEN ip LIKE '10.%'
                        THEN '10.0.0.0/8'
                    ELSE 'Internet'
                END
		AS label, count(*) as value")
        )
            ->groupBy('ip')
            ->orderBy('label')
            ->get();

        return $this->addColors($data);
    }

    /**
     * Creates the Regexp function for the SQLITE database
     */
    protected function createSqliteRegexpFunction()
    {
        DB::connection()->getPdo()->sqliteCreateFunction("REGEXP", "preg_match", 2);
    }

    private function addColors($data)
    {
        $colors = ['rgb(23,103,153)', 'rgb(47,135,176)', 'rgb(66,164,187)', 'rgb(91,192,196)'];
        $highlight_colors = ['#8BB3CC', '#97C3D7', '#ADDFE1', '#BBEAE3'];
        foreach($data as $i => $network)
        {
            $network['color'] = $colors[$i];
            $network['highlight'] = $highlight_colors[$i];
        }

        return $data;
    }
}