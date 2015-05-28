<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPublicAndGroupToDevicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('devices', function(Blueprint $table)
		{
            $table->string('group', 30)->nullable();
			$table->string('public', 5)->default('auto');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('devices', function(Blueprint $table)
		{
            $table->dropColumn('group');
            $table->dropColumn('public');
		});
	}

}
