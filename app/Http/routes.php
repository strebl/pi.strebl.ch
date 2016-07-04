<?php

Route::get('/', 'WelcomeController@index');

Route::get('/getting-started', 'WelcomeController@gettingStarted');

Route::get('/stats', 'WelcomeController@statistics');

Route::group(['prefix' => 'api/v1', 'namespace' => 'Api'], function () {
    Route::get('/devices/@{group}', 'DeviceController@index');
    Route::resource('devices', 'DeviceController', ['except' => ['create', 'edit']]);

    Route::post('devices/poke', [
        'as'   => 'api.v1.devices.poke',
        'uses' => 'DeviceController@poke',
    ]);
});

Route::get('/@{group}', 'GroupController@show');
