<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductSpecification extends Model
{
    use HasFactory;
    protected $table = 'product_specifications';
    protected $fillable = [
        'product_id',
        'name',
        'value'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
