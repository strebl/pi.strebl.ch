<?php

namespace PiFinder\Http\Requests;

use Illuminate\Http\JsonResponse;

class StoreComputerRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ip'   => 'required|ip',
            'mac'  => 'required|mac',
            'name' => 'required',
            'group' => 'alpha_dash|max:30',
            'public' => 'in:true,false,auto',
        ];
    }

    public function response(array $errors)
    {
        return new JsonResponse($errors, 422);
    }
}
