<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'role_id' => $this->role_id == 1 ? 'Admin' : 'Sales Manager',
            'photo' => $this->photo != null ? url(User::IMAGE_USER.'/'.$this->photo) : url(User::IMAGE_DEFAULT.'/'.'default.webp'),
            'created_at' => $this->created_at->toDayDateTimeString(),
        ];
    }
}
