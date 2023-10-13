<?php

namespace App\Models;


use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    public const IMAGE_SUPPLIER = 'images/supplier';
    public const IMAGE_DEFAULT = 'images';
    use HasFactory;
    protected $table = 'suppliers';
    protected $fillable = [
        'name',
        'phone',
        'email',
        'status',
        'description',
        'logo',
        'address',
        'districtId',
        'provinceId',
        'regencyId',
        'villageId',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
