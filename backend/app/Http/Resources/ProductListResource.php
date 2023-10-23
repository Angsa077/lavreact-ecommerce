<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductAttributeListResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'cost' => $this->cost,
            'price' => $this->price,
            'stock' => $this->stock,
            'status' => $this->status == 1 ? 'Active' : 'Inactive',
            'discount_fixed' => $this->discount_fixed,
            'discount_percent' => $this->discount_percent,
            'discount_start' => $this->discount_start != null ? Carbon::create($this->discount_start)->toDayDateTimeString() : 'Not updated yet',
            'discount_end' => $this->discount_end != null ? Carbon::create($this->discount_end)->toDayDateTimeString() : 'Not updated yet',
            'description' => $this->description,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',

            'brand' => $this->brand?->name,
            'category' => $this->category?->name,
            'sub_category' => $this->sub_category?->name,
            'supplier' => $this->supplier?->name,
            'created_by' =>$this->created_by?->name,
            'updated_by' =>$this->updated_by?->name,

            'attributes' => ProductAttributeListResource::collection($this->product_attributes),
        ];
    }
}
