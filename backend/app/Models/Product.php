<?php

namespace App\Models;

use App\Models\Category;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'cost',
        'price',
        'stock',
        'status',
        'discount_fixed',
        'discount_percent',
        'discount_start',
        'discount_end',
        'description',
        'brand_id',
        'sub_category_id',
        'supplier_id',
        'created_by_id',
        'updated_by_id',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function attribute()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function specification()
    {
        return $this->hasMany(ProductSpecification::class);
    }
}
