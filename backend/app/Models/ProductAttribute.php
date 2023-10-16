<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductAttribute extends Model
{
    use HasFactory;
    protected $table = 'product_attributes';
    protected $fillable = [
        'product_id',
        'attribute_id',
        'attribute_value_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
