<?php

namespace App\Http\Resources;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierEditResource extends JsonResource
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
            'phone' => $this->phone,
            'email' => $this->email,
            'description' => $this->description,
            'status' => $this->status,
            'logo' => $this->logo != null ? url(Supplier::IMAGE_SUPPLIER.'/'.$this->logo) : url(Supplier::IMAGE_DEFAULT.'/'.'default.webp'),
            'address' => $this->address,
            'districtId' => $this->districtId,
            'provinceId' => $this->provinceId,
            'regencyId' => $this->regencyId,
            'villageId' => $this->villageId
        ];
    }
}
