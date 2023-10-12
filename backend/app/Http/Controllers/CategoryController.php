<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestCategoryStore;
use App\Http\Requests\RequestCategoryUpdate;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Exception;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestCategoryStore $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;

            if ($request->has('photo')) {
                $base64String = $request->input('photo');
                $data['photo'] = $this->saveBase64Image($base64String);
            }

            $category = Category::create($data);
            return response()->json(['message' => 'Category created successfully', 'data' => $category], 201);
        } catch (Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating category'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['data' => new CategoryEditResource($category)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RequestCategoryUpdate $request, string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $data = $request->validated();

            if ($request->has('photo')) {
                $base64String = $request->input('photo');
                $data['photo'] = $this->saveBase64Image($base64String);
            }

            $category->update($data);
            return response()->json(['message' => 'Category updated successfully', 'data' => $category], 200);
        } catch (Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating category'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (!empty($category->photo)) {
            unlink(public_path('images/category/' . $category->photo));
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }

    private function saveBase64Image($base64String)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $fileName = time() . '.webp';
        file_put_contents(public_path('images/category/' . $fileName), $imageData);
        return $fileName;
    }
}
