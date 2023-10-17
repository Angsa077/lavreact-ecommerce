<?php

namespace App\Http\Controllers;

use App\Models\ProductAttribute;
use App\Http\Requests\StoreProductAttributeRequest;
use App\Http\Requests\UpdateProductAttributeRequest;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;

class ProductAttributeController extends Controller
{

    public function index(Request $request)
    {

    }


    public function store(StoreProductAttributeRequest $request)
    {
        try {
            $data = $request->validated();
            $data['product_id '] = $request->input('product_id');
            $productAttribute = ProductAttribute::create($data);
            return response()->json(['message' => 'Product attribute created successfully', 'data' => $productAttribute], 201);
        } catch (Exception $e) {
            Log::error('Error creating product attribute: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating product attribute'], 500);
        }
    }


    public function update(UpdateProductAttributeRequest $request, string $id)
    {

    }

    public function destroy(ProductAttribute $productAttribute)
    {

    }
}
