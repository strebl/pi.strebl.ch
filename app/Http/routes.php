<?php

Route::get('/', 'WelcomeController@index');

Route::get('/getting-started', 'WelcomeController@gettingStarted');

Route::get('/stats', 'WelcomeController@statistics');

Route::group(['prefix' => 'api/v1', 'namespace' => 'Api'], function () {
    Route::resource('devices', 'DeviceController', ['except' => ['create', 'edit']]);

    Route::post('devices/poke', [
        'as'   => 'api.v1.devices.poke',
        'uses' => 'DeviceController@poke',
    ]);
});
