<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNetworkDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('network_distribution', function (Blueprint $table) {
            $table->string('network')->unique()->index();
            $table->integer('pokes')->default(0);
        });

        DB::table('network_distribution')->insert([
            ['network' => '192.168.0.0/16'],
            ['network' => '172.16.0.0/12'],
            ['network' => '10.0.0.0/8'],
            ['network' => 'Internet'],
        ]);

        $networks = DB::table('pokes')->select(DB::raw('ip as network, count(ip) as pokes'))
            ->groupBy('network')
            ->orderBy('network')
            ->get();

        $networks->each(function ($network) {
            DB::table('network_distribution')
                ->where('network', $network->network)
                ->update(['pokes' => $network->pokes]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('network_distribution');
    }
}
