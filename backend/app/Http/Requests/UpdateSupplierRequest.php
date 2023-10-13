<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:50',
            'phone' => 'required|string|max:20',
            'email' => [
                'required',
                'email',
                'min:3',
                'max:100',
                Rule::unique('suppliers', 'email')->ignore($this->route('supplier')),
            ],
            'description' => 'nullable|min:3|max:255',
            'address' => 'nullable|min:3|max:255',
            'districtId' => 'required|string',
            'provinceId' => 'required|string',
            'regencyId' => 'required|string',
            'villageId' => 'required|string',
            'status' => 'required|numeric',
        ];
    }
}
