<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class Request extends FormRequest
{
    public function __construct()
    {
        parent::__construct();

        $this->validateMac();
    }

    public function validateMac()
    {
        app('validator')->extend('mac', function ($attribute, $value, $parameters) {
            return preg_match('/^(([0-9a-fA-F]{2}-){5}|([0-9a-fA-F]{2}:){5})[0-9a-fA-F]{2}$/', $value);
        });
    }
}
