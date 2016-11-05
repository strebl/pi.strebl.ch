<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ReplacePokeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokes_replacement', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date')->unique()->index();
            $table->integer('pokes')->default(0);
        });

        $dates = DB::table('pokes')->select(DB::raw('count(*) as pokes, date(created_at) as date'))
            ->groupBy('date')
            ->get();

        $dates = ($dates->map(function ($date) {
            return (array) $date;
        }));

        DB::table('pokes_replacement')->insert($dates->toArray());

        Schema::rename('pokes', 'pokes_legacy');
        Schema::rename('pokes_replacement', 'pokes');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pokes');
        Schema::rename('pokes_legacy', 'pokes');
    }
}
