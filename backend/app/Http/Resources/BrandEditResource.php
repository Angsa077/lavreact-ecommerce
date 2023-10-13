<?php

namespace App\Http\Resources;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandEditResource extends JsonResource
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
            'slug' => $this->slug,
            'serial' => $this->serial,
            'description' => $this->description,
            'status' => $this->status,
            'logo' => $this->logo != null ? url(Brand::IMAGE_BRAND.'/'.$this->logo) : url(Brand::IMAGE_DEFAULT.'/'.'default.webp'),
        ];
    }
}
