<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(PiFinder\Device::class, function (Faker\Generator $faker) {
    return [
        'ip'         => $faker->localIpv4,
        'mac'        => $faker->macAddress,
        'name'       => $faker->word,
        'created_at' => $faker->dateTimeBetween('-20 days', 'now'),
        'updated_at' => $faker->dateTimeBetween('-10 mins', 'now'),
        'group'      => null,
        'public'     => 'auto',
    ];
});
