<?php

namespace PiFinder\Http\Controllers;

use PiFinder\Device;


class GroupController extends Controller
{
    /**
     * Show all Devices for the given group.
     *
     * @param string $group
     *
     * @return Response
     */
    public function show($group)
    {
        $devices = Device::where('group', $group)->get();

        return view('overview')->with(compact('devices', 'group'));
    }
}
