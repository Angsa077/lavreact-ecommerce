<?php

namespace App\Http\Resources;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandListResource extends JsonResource
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
            'serial' => $this->serial,
            'description' => $this->description,
            'status' => $this->status == 1 ? 'Active' : 'Inactive',
            'logo' => $this->logo != null ? url(Brand::IMAGE_BRAND.'/'.$this->logo) : url(Brand::IMAGE_DEFAULT.'/'.'default.webp'),
            'created_by' => $this->user->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet'
        ];
    }
}
