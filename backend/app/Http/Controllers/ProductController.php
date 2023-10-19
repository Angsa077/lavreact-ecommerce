<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{

    public function index()
    {
        //
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


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
