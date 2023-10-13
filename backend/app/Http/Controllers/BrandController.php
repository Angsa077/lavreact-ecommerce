<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandListResource;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
{


    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'serial');
        $direction = $request->input('direction', 'asc');
        $brands = Brand::where('name', 'like', '%' . $search . '%')
            ->with('user')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => BrandListResource::collection($brands->items()),
            'meta' => [
                'current_page' => $brands->currentPage(),
                'per_page' => $brands->perPage(),
                'total' => $brands->total(),
                'from' => $brands->firstItem(),
            ],
        ], 200);
    }


    public function store(StoreBrandRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;

            if ($request->has('logo')) {
                $base64String = $request->input('logo');
                if ($base64String) {
                    $data['logo'] = $this->saveBase64Image($base64String, $data['name']);
                }
            }

            $brand = Brand::create($data);
            return response()->json(['message' => 'Brand created successfully', 'data' => $brand], 201);
        } catch (Exception $e) {
            Log::error('Error creating brand: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating brand'], 500);
        }
    }


    public function show(string $id)
    {
        $brand = Brand::findOrFail($id);
        return response()->json(['data' => new BrandEditResource($brand)], 200);
    }


    public function update(UpdateBrandRequest $request, string $id)
    {
        try {
            $brand = Brand::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $brand->user_id) {
                return response()->json(['message' => 'You are not authorized to update this brand'], 403);
            }

            if ($request->has('logo')) {
                $logoData = $request->input('logo');
                if (filter_var($logoData, FILTER_VALIDATE_URL)) {
                    $data['logo'] = $brand->logo;
                } else {
                    if (!empty($brand->logo)) {
                        $fileToDelete = public_path('images/brand/' . $brand->logo);
                        if (File::exists($fileToDelete)) {
                            File::delete($fileToDelete);
                        }
                    }
                    $data['logo'] = $this->saveBase64Image($logoData, $data['name']);
                }
            }

            $brand->update($data);
            return response()->json(['message' => 'Brand updated successfully', 'data' => $brand], 200);
        } catch (Exception $e) {
            Log::error('Error updating brand: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating brand'], 500);
        }
    }


    public function destroy(Brand $brand)
    {
        if (!empty($brand->logo)) {
            $fileToDelete = public_path('images/brand/' . $brand->logo);
            if (File::exists($fileToDelete)) {
                File::delete($fileToDelete);
            }
        }
        $brand->delete();
        return response()->json(['message' => 'Brand deleted successfully'], 200);
    }


    private function saveBase64Image($base64String, $imageName)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $fileName = $imageName . '.webp';
        file_put_contents(public_path('images/brand/' . $fileName), $imageData);
        return $fileName;
    }
}
