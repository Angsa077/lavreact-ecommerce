<?php

namespace App\Http\Resources;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return 
        [
            'id' => $this->id,
            'name' => $this->name,
            'category_id' => $this->category_id,
            'slug' => $this->slug,
            'serial' => $this->serial,
            'description' => $this->description,
            'status' => $this->status,
            'photo' => $this->photo != null ? url(SubCategory::IMAGE_SUB_CATEGORY.'/'.$this->photo) : url(SubCategory::IMAGE_DEFAULT.'/'.'default.webp'),
        ];
    }
}
