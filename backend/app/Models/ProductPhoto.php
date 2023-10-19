<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductPhoto extends Model
{
    use HasFactory;
    protected $table = 'product_photos';
    protected $fillable = [
        'product_id',
        'photo',
        'is_primary'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
