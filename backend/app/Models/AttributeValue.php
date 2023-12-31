<?php

namespace App\Models;

use App\Models\User;
use App\Models\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AttributeValue extends Model
{
    use HasFactory;
    protected $table = 'attribute_values';
    protected $fillable = [
        'name',
        'status',
        'attribute_id',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}
