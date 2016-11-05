<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TransformIpToNetworkOnPokesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('pokes')
            ->where('ip', 'like', '192.168.%')
            ->update(['ip' => '192.168.0.0/16']);

        DB::table('pokes')
            ->where('ip', 'like', '10.%')
            ->update(['ip' => '10.0.0.0/8']);

        DB::table('pokes')
            ->where('ip', 'like', '172.16.%')
            ->orWhere('ip', 'like', '172.17.%')
            ->orWhere('ip', 'like', '172.18.%')
            ->orWhere('ip', 'like', '172.19.%')
            ->orWhere('ip', 'like', '172.20.%')
            ->orWhere('ip', 'like', '172.21.%')
            ->orWhere('ip', 'like', '172.22.%')
            ->orWhere('ip', 'like', '172.23.%')
            ->orWhere('ip', 'like', '172.24.%')
            ->orWhere('ip', 'like', '172.25.%')
            ->orWhere('ip', 'like', '172.26.%')
            ->orWhere('ip', 'like', '172.27.%')
            ->orWhere('ip', 'like', '172.28.%')
            ->orWhere('ip', 'like', '172.29.%')
            ->orWhere('ip', 'like', '172.30.%')
            ->orWhere('ip', 'like', '172.31.%')
            ->update(['ip' => '172.16.0.0/12']);

        DB::table('pokes')
            ->where('ip', 'not like', '192.168.%')
            ->where('ip', 'not like', '10.%')
            ->where('ip', 'not like', '172.16.%')
            ->where('ip', 'not like', '172.17.%')
            ->where('ip', 'not like', '172.18.%')
            ->where('ip', 'not like', '172.19.%')
            ->where('ip', 'not like', '172.20.%')
            ->where('ip', 'not like', '172.21.%')
            ->where('ip', 'not like', '172.22.%')
            ->where('ip', 'not like', '172.23.%')
            ->where('ip', 'not like', '172.24.%')
            ->where('ip', 'not like', '172.25.%')
            ->where('ip', 'not like', '172.26.%')
            ->where('ip', 'not like', '172.27.%')
            ->where('ip', 'not like', '172.28.%')
            ->where('ip', 'not like', '172.29.%')
            ->where('ip', 'not like', '172.30.%')
            ->where('ip', 'not like', '172.31.%')
            ->update(['ip' => 'Internet']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pokes', function (Blueprint $table) {
            //
        });
    }
}
