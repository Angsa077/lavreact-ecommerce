<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestCategoryStore;
use App\Models\Category;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RequestCategoryStore $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->user()->id;

            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images/category'), $fileName);
                $data['photo'] = $fileName;
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
