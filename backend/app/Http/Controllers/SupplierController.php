<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\GetSupplierListResource;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'name');
        $direction = $request->input('direction', 'asc');
        $suppliers = Supplier::where('name', 'like', '%' . $search . '%')
            ->with('user')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => SupplierListResource::collection($suppliers->items()),
            'meta' => [
                'current_page' => $suppliers->currentPage(),
                'per_page' => $suppliers->perPage(),
                'total' => $suppliers->total(),
                'from' => $suppliers->firstItem(),
            ],
        ], 200);
    }


    public function store(StoreSupplierRequest $request)
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

            $supplier = Supplier::create($data);
            return response()->json(['message' => 'Supplier created successfully', 'data' => $supplier], 201);
        } catch (Exception $e) {
            Log::error('Error creating supplier: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating supplier'], 500);
        }
    }


    public function show(string $id)
    {
        $supplier = Supplier::findOrFail($id);
        return response()->json(['data' => new SupplierEditResource($supplier)], 200);
    }


    public function update(UpdateSupplierRequest $request, string $id)
    {
        try {
            $Supplier = Supplier::findOrFail($id);
            $data = $request->validated();

            if (auth()->user()->id !== $Supplier->user_id) {
                return response()->json(['message' => 'You are not authorized to update this supplier'], 403);
            }

            if ($request->has('logo')) {
                $photoData = $request->input('logo');
                if (filter_var($photoData, FILTER_VALIDATE_URL)) {
                    $data['logo'] = $Supplier->logo;
                } else {
                    if (!empty($Supplier->logo)) {
                        $fileToDelete = public_path('images/supplier/' . $Supplier->logo);
                        if (File::exists($fileToDelete)) {
                            File::delete($fileToDelete);
                        }
                    }
                    $data['logo'] = $this->saveBase64Image($photoData, $data['name']);
                }
            }

            $Supplier->update($data);
            return response()->json(['message' => 'Supplier updated successfully', 'data' => $Supplier], 200);
        } catch (Exception $e) {
            Log::error('Error updating supplier: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating supplier'], 500);
        }
    }


    public function destroy(Supplier $supplier)
    {
        if (!empty($supplier->logo)) {
            $fileToDelete = public_path('images/supplier/' . $supplier->logo);
            if (File::exists($fileToDelete)) {
                File::delete($fileToDelete);
            }
        }
        $supplier->delete();
        return response()->json(['message' => 'Supplier deleted successfully'], 200);
    }

    public function getSupplierList()
    {
        $supplier = Supplier::select('name', 'id')->get();
        return response()->json(['data' => GetSupplierListResource::collection($supplier)], 200);
    }


    private function saveBase64Image($base64String, $imageName)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        $fileName = $imageName . '.webp';
        file_put_contents(public_path('images/supplier/' . $fileName), $imageData);
        return $fileName;
    }
}
