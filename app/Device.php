<?php

namespace PiFinder;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['ip', 'name', 'mac', 'public', 'group'];

    public function scopeOnHomePage($query)
    {
        return $query->where('public', 'true')
                     ->orWhere(function ($query) {
                         $query->where('public', 'auto')
                               ->whereNull('group');
                     });
    }

    public function isPublic()
    {
        return $this->public == 'true' || ($this->public == 'auto' && $this->group === null);
    }
}
