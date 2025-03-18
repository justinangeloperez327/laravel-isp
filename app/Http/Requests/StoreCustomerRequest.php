<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'registration_date' => ['required', 'date'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'mobile_no' => ['required', 'string', 'max:255'],

            'floor_or_unit' => ['nullable', 'string', 'max:255'],
            'street' => ['nullable', 'string', 'max:255'],
            'compound_or_building' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'municipality_or_city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],

            'plan_id' => ['required', 'exists:plans,id'],
            // 'start_date' => ['required', 'date'],
            // 'end_date' => ['required', 'date'],
            'status' => ['nullable', 'in:pending,connected,disconnected'],

            'lp' => ['nullable', 'string', 'max:255'],
            'np' => ['nullable', 'string', 'max:255'],
            'slot' => ['nullable', 'string', 'max:255'],

            'devices' => ['nullable', 'array'],
            'devices.*' => ['required', 'exists:devices,id'],

            'billing_due' => ['required', 'in:15th,30th'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'registration_date.required' => 'The registration date is required.',
            'registration_date.date' => 'The registration date must be a valid date.',
            'first_name.required' => 'The first name is required.',
            'first_name.string' => 'The first name must be a string.',
            'first_name.max' => 'The first name must not be greater than 255 characters.',
            'middle_name.string' => 'The middle name must be a string.',
            'middle_name.max' => 'The middle name must not be greater than 255 characters.',
            'last_name.required' => 'The last name is required.',
            'last_name.string' => 'The last name must be a string.',
            'last_name.max' => 'The last name must not be greater than 255 characters.',
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email must not be greater than 255 characters.',
            'mobile_no.required' => 'The mobile number is required.',
            'mobile_no.string' => 'The mobile number must be a string.',
            'mobile_no.max' => 'The mobile number must not be greater than 255 characters.',

            'floor_or_unit.string' => 'The floor or unit must be a string.',
            'floor_or_unit.max' => 'The floor or unit must not be greater than 255 characters.',
            'street.string' => 'The street must be a string.',
            'street.max' => 'The street must not be greater than 255 characters.',
            'compound_or_building.string' => 'The compound or building must be a string.',
            'compound_or_building.max' => 'The compound or building must not be greater than 255 characters.',
            'barangay.string' => 'The barangay must be a string.',
            'barangay.max' => 'The barangay must not be greater than 255 characters.',
            'municipality_or_city.string' => 'The municipality or city must be a string.',
            'municipality_or_city.max' => 'The municipality or city must not be greater than 255 characters.',
            'province.string' => 'The province must be a string.',
            'province.max' => 'The province must not be greater than 255 characters.',

            'plan_id.required' => 'The plan is required.',
            'plan_id.exists' => 'The selected plan is invalid.',
            // 'start_date.required' => 'The start date is required.',
            // 'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date is required.',
            'end_date.date' => 'The end date must be a valid date.',
            'status.in' => 'The selected status is invalid.',


            'lp.string' => 'The LP must be a string.',
            'lp.max' => 'The LP must not be greater than 255 characters.',
            'np.string' => 'The NP must be a string.',
            'np.max' => 'The NP must not be greater than 255 characters.',
            'slot.string' => 'The slot must be a string.',
            'slot.max' => 'The slot must not be greater than 255 characters.',
            'devices.array' => 'The devices must be an array.',
            'devices.*.required' => 'The selected devices is invalid.',

            'billing_due.required' => 'The billing due is required.',
            'billing_due.in' => 'The selected billing due is invalid.',
        ];
    }
}
