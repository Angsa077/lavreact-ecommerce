<?php

namespace App\Http\Controllers;

use App\Models\AttributeValue;
use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use App\Http\Resources\AttributeValueListResource;
use App\Http\Resources\GetAttributeValueListResource;
use Illuminate\Support\Facades\Log;
use Exception;

class AttributeValueController extends Controller
{

    public function index()
    {
        $attributeValues = AttributeValue::with('user', 'attribute')->get();
        return response()->json(['data' => AttributeValueListResource::collection($attributeValues)], 200);
    }


    public function store(StoreAttributeValueRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;

            $attributeValue = AttributeValue::create($data);
            return response()->json(['message' => 'Attribute value created successfully', 'data' => $attributeValue], 201);
        } catch (Exception $e) {
            Log::error('Error creating attribute value: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating attribute value'], 500);
        }
    }


    public function update(UpdateAttributeValueRequest $request, string $id)
    {
        try {
            $attributeValue = AttributeValue::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $attributeValue->user_id) {
                return response()->json(['message' => 'You are not authorized to update this attribute value'], 403);
            }

            $attributeValue->update($data);
            return response()->json(['message' => 'Attribute value updated successfully', 'data' => $attributeValue], 200);
        } catch (Exception $e) {
            Log::error('Error updating attribute value: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating attribute value'], 500);
        }
    }


    public function destroy(AttributeValue $attributeValue)
    {
        $attributeValue->delete();
        return response()->json(['message' => 'Attribute value deleted successfully'], 200);
    }


    public function getAttributeValueList(String $attributeId)
    {
        $attributeValues = AttributeValue::where('attribute_id', $attributeId)->get();
        return response()->json(['data' => GetAttributeValueListResource::collection($attributeValues)], 200);
    }
}
