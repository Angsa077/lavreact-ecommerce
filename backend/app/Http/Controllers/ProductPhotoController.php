<?php

namespace App\Http\Controllers;

use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductPhotoRequest;
use App\Http\Requests\UpdateProductPhotoRequest;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ProductPhotoController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(StoreProductPhotoRequest $request)
    {
        //
    }

    public function upload(Request $request, String $id)
    {
        try {
            $product = Product::findOrFail($id);
            $requestData = $request->input();
            $inputProductPhotos = $requestData['photos'];
            $createdPhotos = [];

            foreach ($inputProductPhotos as $inputPhoto) {
                $data = [];
                if (isset($inputPhoto['photo'])) {
                    $photoData = $inputPhoto['photo'];
                    $data['is_primary'] = isset($inputPhoto['is_primary']) ? $inputPhoto['is_primary'] : false;
                    if (filter_var($photoData, FILTER_VALIDATE_URL)) {
                        $data['photo'] = $product->photo;
                    } else {
                        if (!empty($product->photo)) {
                            $fileToDelete = public_path('images/product/' . $product->photo);
                            if (File::exists($fileToDelete)) {
                                File::delete($fileToDelete);
                            }
                        }
                        $data['photo'] = $this->saveBase64Image($photoData, $product->name);
                    }
                    $data['product_id'] = $product->id;
                    $productPhoto = ProductPhoto::create($data);
                    $createdPhotos[] = $productPhoto;
                }
            }

            return response()->json(['message' => 'Product updated successfully', 'data' => $createdPhotos], 200);
        } catch (Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating product'], 500);
        }
    }


    public function show(ProductPhoto $productPhoto)
    {
        //
    }

    public function edit(ProductPhoto $productPhoto)
    {
        //
    }

    public function update(UpdateProductPhotoRequest $request, ProductPhoto $productPhoto)
    {
        //
    }

    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }

    private function saveBase64Image($base64String, $productName)
    {
        $timestamp = now()->format('dmYHis');
        $randomNumber = mt_rand(10000, 99999);
        $fileName = $productName . '-' . $timestamp . '-' . $randomNumber . '.webp';
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
        file_put_contents(public_path('images/product/' . $fileName), $imageData);
        return $fileName;
    }
}
