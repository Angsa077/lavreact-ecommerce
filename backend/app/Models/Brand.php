<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    public const IMAGE_BRAND = 'images/brand';
    public const IMAGE_DEFAULT = 'images';
    use HasFactory;
    protected $table = 'brands';
    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'serial',
        'status',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
