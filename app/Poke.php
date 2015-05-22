<?php

namespace PiFinder;

use Illuminate\Database\Eloquent\Model;

class Poke extends Model
{
    protected $fillable = ['ip', 'mac'];
}
