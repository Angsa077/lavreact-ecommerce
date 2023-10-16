<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeListResource;
use App\Http\Resources\GetAttributeListResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class AttributeController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'name');
        $direction = $request->input('direction', 'asc');
        $attributes = Attribute::where('name', 'like', '%' . $search . '%')
            ->with('user')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => AttributeListResource::collection($attributes->items()),
            'meta' => [
                'current_page' => $attributes->currentPage(),
                'per_page' => $attributes->perPage(),
                'total' => $attributes->total(),
                'from' => $attributes->firstItem(),
            ],
        ], 200);
    }


    public function store(StoreAttributeRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;
            $attribute = Attribute::create($data);
            return response()->json(['message' => 'Attribute created successfully', 'data' => $attribute], 201);
        } catch (Exception $e) {
            Log::error('Error creating attribute: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating attribute'], 500);
        }
    }


    public function update(UpdateAttributeRequest $request, string $id)
    {
        try {
            $attribute = Attribute::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $attribute->user_id) {
                return response()->json(['message' => 'You are not authorized to update this attribute'], 403);
            }

            $attribute->update($data);
            return response()->json(['message' => 'Attribute updated successfully', 'data' => $attribute], 200);
        } catch (Exception $e) {
            Log::error('Error updating attribute: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating attribute'], 500);
        }
    }


    public function getAttributeList()
    {
        $attributes = Attribute::select('name', 'id')->get();
        return response()->json(['data' => GetAttributeListResource::collection($attributes)], 200);
    }

    
    public function destroy(Attribute $attribute)
    {
        $attribute->delete();
        return response()->json(['message' => 'Attribute deleted successfully'], 200);
    }
}
