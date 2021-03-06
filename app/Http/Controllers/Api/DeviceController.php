<?php

namespace PiFinder\Http\Controllers\Api;

use Carbon\Carbon;
use PiFinder\Device;
use PiFinder\Events\ServerWasPoked;
use PiFinder\Transformers\DeviceTransformer;
use PiFinder\Http\Requests\StoreComputerRequest;

class DeviceController extends ApiController
{
    /**
     * @var DeviceTransformer
     */
    private $transformer;

    public function __construct(DeviceTransformer $transformer)
    {
        $this->middleware('auth.basic', ['except' => ['index', 'poke', 'show']]);

        $this->transformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @param null $group
     *
     * @return Response
     */
    public function index($group = null)
    {
        $devices = $group ? Device::where('group', $group)->get() : Device::onHomePage()->get();

        return $this->respond([
            'data'        => $this->transformer->transformCollection($devices->all()),
            'server_time' => Carbon::now()->toIso8601String(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreComputerRequest $request
     *
     * @return Response
     */
    public function store(StoreComputerRequest $request)
    {
        $device = Device::create($request->all());

        $device->public = $request->get('public', 'auto');

        return $this->respondCreated($this->transformer->transform($device), $device->id);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $device = Device::find($id);

        if (! $device) {
            return $this->respondNotFound('Did not find the device you are looking for!');
        }

        return $this->respond([
            'data' => $this->transformer->transform($device),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreComputerRequest $request
     * @param int                  $id
     *
     * @return Response
     */
    public function update(StoreComputerRequest $request, $id)
    {
        $device = Device::find($id);

        if (! $device) {
            return $this->respondNotFound('Did not find the device you are looking for!');
        }

        $device = $device->fill($request->all());

        $device->save();

        return $this->respond([
            'data' => $this->transformer->transform($device),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $device = Device::find($id);

        if (! $device) {
            return $this->respondNotFound('Did not find the device you are looking for!');
        }

        $device->delete();

        return $this->respondNoContent();
    }

    /**
     * Handle device pokes.
     *
     * @param StoreComputerRequest $request
     *
     * @throws \Exception
     *
     * @return Response
     */
    public function poke(StoreComputerRequest $request)
    {
        $device = Device::firstOrNew(['mac' => $request->mac]);

        $device->fill($request->all());

        $device->group = $request->get('group', null);
        $device->public = $request->get('public', 'auto');

        $device->touch();

        event(new ServerWasPoked(array_add($device, 'server_time', Carbon::now()->toDateTimeString())));

        return $this->respondPoked($this->transformer->transform($device), $device->id);
    }
}
