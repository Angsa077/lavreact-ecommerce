<?php

namespace App\Http\Controllers;

use App\Models\ProductAttribute;
use App\Http\Requests\StoreProductAttributeRequest;
use App\Http\Requests\UpdateProductAttributeRequest;
use App\Http\Resources\ProductAttributeEditResource;
use App\Http\Resources\ProductAttributeListResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class ProductAttributeController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'name');
        $direction = $request->input('direction', 'asc');
        $productAttributes = ProductAttribute::where('name', 'like', '%' . $search . '%')
            ->with('user')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => ProductAttributeListResource::collection($productAttributes->items()),
            'meta' => [
                'current_page' => $productAttributes->currentPage(),
                'per_page' => $productAttributes->perPage(),
                'total' => $productAttributes->total(),
                'from' => $productAttributes->firstItem(),
            ],
        ], 200);
    }


    public function store(StoreProductAttributeRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;
            $productAttribute = ProductAttribute::create($data);
            return response()->json(['message' => 'Product attribute created successfully', 'data' => $productAttribute], 201);
        } catch (Exception $e) {
            Log::error('Error creating product attribute: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating product attribute'], 500);
        }
    }


    public function update(UpdateProductAttributeRequest $request, string $id)
    {
        try {
            $productAttribute = ProductAttribute::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $productAttribute->user_id) {
                return response()->json(['message' => 'You are not authorized to update this product attribute'], 403);
            }

            $productAttribute->update($data);
            return response()->json(['message' => 'Brand updated successfully', 'data' => $productAttribute], 200);
        } catch (Exception $e) {
            Log::error('Error updating product attribute: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating product attribute'], 500);
        }
    }


    public function destroy(ProductAttribute $productAttribute)
    {
        $productAttribute->delete();
        return response()->json(['message' => 'Product attribute deleted successfully'], 200);
    }
}
