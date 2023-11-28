<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'status',
        'user_id',
        'size',
    ];

    // Definisikan relasi dengan model Product
    public function product()
    {
        return $this->belongsTo(Produk::class);
    }

    // Definisikan relasi dengan model User
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}
