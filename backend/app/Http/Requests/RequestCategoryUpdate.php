<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RequestCategoryUpdate extends FormRequest
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
            'slug' => [
                'required',
                'string',
                'min:3',
                'max:100',
                Rule::unique('categories', 'slug')->ignore($this->route('category')),
            ],
            'description' => 'required|min:3|max:255',
            'serial' => 'required|numeric',
            'status' => 'required|numeric',
        ];
    }
}
