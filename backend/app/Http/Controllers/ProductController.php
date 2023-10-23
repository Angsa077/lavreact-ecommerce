<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductListResource;
use App\Models\ProductPhoto;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $search = $request->input('search', '');
        $order_by = $request->input('order_by', 'name');
        $direction = $request->input('direction', 'asc');
        $products = Product::where('name', 'like', '%' . $search . '%')
            ->with('product_attributes', 'specification', 'productPhoto')
            ->orderBy($order_by, $direction)
            ->paginate($perPage);

        return response()->json([
            'data' => ProductListResource::collection($products->items()),
            'meta' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'from' => $products->firstItem(),
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $requestData = $request->input();
        $inputProduct = $requestData['inputProduct'];

        $productData = [
            'name' => $inputProduct['name'],
            'slug' => $inputProduct['slug'],
            'sku' => $inputProduct['sku'],
            'cost' => $inputProduct['cost'],
            'price' => $inputProduct['price'],
            'stock' => $inputProduct['stock'],
            'description' => $inputProduct['description'],
            'brand_id' => $inputProduct['brand_id'],
            'sub_category_id' => $inputProduct['sub_category_id'],
            'supplier_id' => $inputProduct['supplier_id'],
            'category_id' => $inputProduct['category_id'],
            'status' => $inputProduct['status'],
            'discount_percent' => $inputProduct['discount_percent'],
            'discount_fixed' => $inputProduct['discount_fixed'],
            'discount_start' => $inputProduct['discount_start'],
            'discount_end' => $inputProduct['discount_end'],
            'created_by_id' => auth()->user()->id,
            'updated_by_id' => auth()->user()->id,
        ];

        $product = Product::create($productData);
        if (isset($requestData['attributeInput'])) {
            $attributeInput = $requestData['attributeInput'];
            foreach ($attributeInput as $attribute) {
                if (!empty($attribute['attribute_id']) && !empty($attribute['attribute_value_id'])) {
                    $productAttributeData = [
                        'product_id' => $product->id,
                        'attribute_id' => $attribute['attribute_id'],
                        'attribute_value_id' => $attribute['attribute_value_id'],
                    ];
                    ProductAttribute::create($productAttributeData);
                }
            }
        }

        if (isset($requestData['specificationInput'])) {
            $specificationInput = $requestData['specificationInput'];
            foreach ($specificationInput as $specification) {
                if (!empty($specification['name_specification']) && !empty($specification['value_specification'])) {
                    $productSpecificationData = [
                        'product_id' => $product->id,
                        'name' => $specification['name_specification'],
                        'value' => $specification['value_specification'],
                    ];
                    ProductSpecification::create($productSpecificationData);
                }
            }
        }

        return response()->json(['message' => 'Produk berhasil disimpan', 'data' => $product], 201);
    }



    public function show(Product $product)
    {
        //
    }


    public function edit(Product $product)
    {
        //
    }


    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }


    public function destroy(Product $product)
    {

        $photoData = ProductPhoto::where('product_id', $product->id);

        if (!empty($photoData)) {
            $fileToDelete = public_path('images/product/' . $product->photo);
            if (File::exists($fileToDelete)) {
                File::delete($fileToDelete);
                $photoData->delete();
            }
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
