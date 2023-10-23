<?php

namespace App\Models;

use App\Models\User;
use App\Models\Brand;
use App\Models\Supplier;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\ProductPhoto;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    public const IMAGE_PRODUCT = 'images/product';
    public const IMAGE_DEFAULT = 'images';
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
        'category_id',
        'sub_category_id',
        'supplier_id',
        'brand_id',
        'created_by_id',
        'updated_by_id',
    ];

    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by_id', 'id' );
    }

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by_id', 'id' );
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sub_category()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function product_attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function specification()
    {
        return $this->hasMany(ProductSpecification::class);
    }

    public function productPhoto()
    {
        return $this->hasMany(ProductPhoto::class);
    }
}
