<?php

Route::get('/', 'WelcomeController@index');

Route::get('/getting-started', 'WelcomeController@gettingStarted');

Route::get('/stats', 'WelcomeController@statistics');

Route::get('/@{group}', 'GroupController@show');
