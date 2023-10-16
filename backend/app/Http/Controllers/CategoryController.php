<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestCategoryStore;
use App\Http\Requests\RequestCategoryUpdate;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Http\Resources\GetCategoryListResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'serial');
        $direction = $request->input('direction', 'asc');
        $categories = Category::where('name', 'like', '%' . $search . '%')
            ->with('user')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => CategoryListResource::collection($categories->items()),
            'meta' => [
                'current_page' => $categories->currentPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
                'from' => $categories->firstItem(),
            ],
        ], 200);
    }


    public function store(RequestCategoryStore $request)
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

            $category = Category::create($data);
            return response()->json(['message' => 'Category created successfully', 'data' => $category], 201);
        } catch (Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating category'], 500);
        }
    }


    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['data' => new CategoryEditResource($category)], 200);
    }


    public function update(RequestCategoryUpdate $request, string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $category->user_id) {
                return response()->json(['message' => 'You are not authorized to update this category'], 403);
            }

            if ($request->has('photo')) {
                $photoData = $request->input('photo');
                if (filter_var($photoData, FILTER_VALIDATE_URL)) {
                    $data['photo'] = $category->photo;
                } else {
                    if (!empty($category->photo)) {
                        $fileToDelete = public_path('images/category/' . $category->photo);
                        if (File::exists($fileToDelete)) {
                            File::delete($fileToDelete);
                        }
                    }
                    $data['photo'] = $this->saveBase64Image($photoData, $data['name']);
                }
            }

            $category->update($data);
            return response()->json(['message' => 'Category updated successfully', 'data' => $category], 200);
        } catch (Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating category'], 500);
        }
    }


    public function destroy(Category $category)
    {
        if (!empty($category->photo)) {
            $fileToDelete = public_path('images/category/' . $category->photo);
            if (File::exists($fileToDelete)) {
                File::delete($fileToDelete);
            }
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }


    public function getCategoryList()
    {
        $categories = Category::select('name', 'id')->get();
        return response()->json(['data' => GetCategoryListResource::collection($categories)], 200);
    }


    private function saveBase64Image($base64String, $imageName)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $fileName = $imageName . '.webp';
        file_put_contents(public_path('images/category/' . $fileName), $imageData);
        return $fileName;
    }
}
