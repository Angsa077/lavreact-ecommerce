<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Exception;

class SubCategoryController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'serial');
        $direction = $request->input('direction', 'asc');
        $subCategories = SubCategory::where('name', 'like', '%' . $search . '%')
            ->with('user', 'category')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => SubCategoryListResource::collection($subCategories->items()),
            'meta' => [
                'current_page' => $subCategories->currentPage(),
                'per_page' => $subCategories->perPage(),
                'total' => $subCategories->total(),
                'from' => $subCategories->firstItem(),
            ],
        ], 200);
    }


    public function store(StoreSubCategoryRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;

            if ($request->has('photo')) {
                $base64String = $request->input('photo');
                if ($base64String) {
                    $data['photo'] = $this->saveBase64Image($base64String, $data['name']);
                }
            }

            $subCategory = SubCategory::create($data);
            return response()->json(['message' => 'Sub category created successfully', 'data' => $subCategory], 201);
        } catch (Exception $e) {
            Log::error('Error creating sub category: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating sub category'], 500);
        }
    }


    public function show(string $id)
    {
        $subCategory = SubCategory::findOrFail($id);
        return response()->json(['data' => new SubCategoryEditResource($subCategory)], 200);
    }


    public function update(UpdateSubCategoryRequest $request, string $id)
    {
        try {
            $SubCategory = SubCategory::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $SubCategory->user_id) {
                return response()->json(['message' => 'You are not authorized to update this category'], 403);
            }

            if ($request->has('photo')) {
                $photoData = $request->input('photo');
                if (filter_var($photoData, FILTER_VALIDATE_URL)) {
                    $data['photo'] = $SubCategory->photo;
                } else {
                    if (!empty($SubCategory->photo)) {
                        $fileToDelete = public_path('images/subcategory/' . $SubCategory->photo);
                        if (File::exists($fileToDelete)) {
                            File::delete($fileToDelete);
                        }
                    }
                    $data['photo'] = $this->saveBase64Image($photoData, $data['name']);
                }
            }

            $SubCategory->update($data);
            return response()->json(['message' => 'Sub category updated successfully', 'data' => $SubCategory], 200);
        } catch (Exception $e) {
            Log::error('Error updating sub category: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating sub category'], 500);
        }
    }


    public function destroy(SubCategory $subCategory)
    {
        if (!empty($subCategory->photo)) {
            $fileToDelete = public_path('images/subcategory/' . $subCategory->photo);
            if (File::exists($fileToDelete)) {
                File::delete($fileToDelete);
            }
        }
        $subCategory->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }


    private function saveBase64Image($base64String, $imageName)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $fileName = $imageName . '.webp';
        file_put_contents(public_path('images/subcategory/' . $fileName), $imageData);
        return $fileName;
    }
}
