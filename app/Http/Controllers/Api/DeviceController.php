<?php

namespace app\Http\Controllers\Api;

use App\Device;
use App\Http\Requests\StoreComputerRequest;
use App\Transformers\DeviceTransformer;

class DeviceController extends ApiController
{
    /**
     * @var DeviceTransformer
     */
    private $transformer;

    public function __construct(DeviceTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $devices = Device::all();

        return $this->respond([
            'data' => $this->transformer->transformCollection($devices->all()),
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

        if (!$device) {
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

        if (!$device) {
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

        if (!$device) {
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
     * @return Response
     *
     * @throws \Exception
     */
    public function poke(StoreComputerRequest $request)
    {
        $device = Device::firstOrNew(['mac' => $request->mac]);

        $device->fill($request->all())->touch();

        return $this->respondPoked($this->transformer->transform($device), $device->id);
    }
}
