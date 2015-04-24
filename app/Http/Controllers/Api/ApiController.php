<?php

namespace PiFinder\Http\Controllers\Api;

use Illuminate\Support\Facades\Response;
use PiFinder\Http\Controllers\Controller;

class ApiController extends Controller
{
    /**
     * Default Status Code.
     *
     * @var int
     */
    protected $statusCode = 200;

    /**
     * @return int
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param int $statusCode
     *
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * @param array $data
     *
     * @return mixed
     */
    public function respondCreated($data, $id)
    {
        $headers = [
            'Location' => route('api.v1.devices.show', $id),
        ];

        return $this->setStatusCode(201)->respond(compact('data'), $headers);
    }

    /**
     * @param array $data
     *
     * @return mixed
     */
    public function respondPoked($data, $id)
    {
        $headers = [
            'Location' => route('api.v1.devices.show', $id),
        ];

        return $this->setStatusCode(200)->respond(compact('data'), $headers);
    }

    /**
     * @return mixed
     */
    public function respondNoContent()
    {
        return $this->setStatusCode(204)->respond([]);
    }

    /**
     * @param string $message
     *
     * @return mixed
     */
    public function respondNotFound($message = 'Did not find the resource you are looking for!')
    {
        return $this->setStatusCode(404)->respondWithError($message);
    }

    /**
     * @param $data
     * @param array $headers
     *
     * @return mixed
     */
    public function respond($data, $headers = [])
    {
        return Response::json($data, $this->getStatusCode(), $headers);
    }

    /**
     * @param $message
     *
     * @return mixed
     */
    public function respondWithError($message)
    {
        return $this->respond([
            'errors' => [
                'title'  => $message,
                'status' => $this->getStatusCode(),
            ],
        ]);
    }
}
