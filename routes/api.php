<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::group(['prefix' => 'v1', 'namespace' => 'Api'], function () {
    Route::get('/devices/@{group}', 'DeviceController@index');
    Route::resource('devices', 'DeviceController', ['except' => ['create', 'edit']]);

    Route::post('devices/poke', [
        'as'   => 'devices.poke',
        'uses' => 'DeviceController@poke',
    ]);
});
