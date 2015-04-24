<?php

namespace app;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['ip', 'name', 'mac'];
}
