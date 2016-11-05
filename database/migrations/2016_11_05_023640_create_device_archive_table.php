<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeviceArchiveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('device_archive', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mac_hash')->unique()->index();
            $table->timestamps();
        });

        $devices = DB::table('pokes')->distinct()->get(['mac']);

        $devices->each(function ($device) {
            \PiFinder\DeviceArchive::create([
                'mac_hash' => md5($device->mac)
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('device_archive');
    }
}
