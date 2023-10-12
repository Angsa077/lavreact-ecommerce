<?php

namespace App\Models;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubCategory extends Model
{
    public const IMAGE_SUB_CATEGORY = 'images/subcategory';
    public const IMAGE_DEFAULT = 'images';
    use HasFactory;
    protected $table = 'sub_categories';
    protected $fillable = [
        'name',
        'category_id',
        'slug',
        'description',
        'photo',
        'serial',
        'status',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
