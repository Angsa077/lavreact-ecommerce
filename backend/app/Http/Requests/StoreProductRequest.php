<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
     * @return array<string,
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:50',
            'slug' => 'required|string|unique:categories,slug|min:3|max:100',
            'sku' => 'required|string|unique:products,sku|min:3|max:100',
            'cost' => 'required|numeric',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'status' => 'required|numeric',
            'discount_fixed' => 'nullable|numeric',
            'discount_percent' => 'nullable|numeric',
            'discount_start' => 'nullable|date',
            'discount_end' => 'nullable|date',
            'description' => 'nullable|min:3|max:255',
            'brand_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'sub_category_id' => 'required|numeric',
            'supplier_id' => 'required|numeric',
        ];
    }
}
