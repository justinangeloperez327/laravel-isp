<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class StorePlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'speed' => ['required', 'string'],
            'description' => ['required', 'string'],
            'type' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'price.required' => 'Price is required',
            'speed.required' => 'Speed is required',
            'description.required' => 'Description is required',
            'type.required' => 'Type is required',
        ];
    }
}
