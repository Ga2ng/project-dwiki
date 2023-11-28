<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $userId = auth()->id(); // Sesuaikan dengan kebutuhan Anda
        $userRole = Auth::user()->role;
        // return dd($userRole);

        if ($userRole === 'admin') {
            $carts = Cart::join('produks', 'carts.product_id', '=', 'produks.id')
                ->select(
                    'carts.*',
                    'produks.brand as product_brand',
                    'produks.productDescription as product_description',
                    'produks.harga as product_harga',
                    'produks.image as product_image'
                )
                ->get();
            // return dd($carts);
        } else {
            // Jika bukan admin, ambil hanya keranjang pengguna saat ini dengan join ke produk
            $userId = Auth::id();
            $carts = Cart::where('user_id', $userId)
                ->join('produks', 'carts.product_id', '=', 'produks.id')
                ->select(
                    'carts.*',
                    'produks.brand as product_brand',
                    'produks.productDescription as product_description',
                    'produks.harga as product_harga',
                    'produks.image as product_image'
                )
                ->get();
        }

        return inertia('HistoryPage', [
            'history' => $carts,
        ]);
    }
}
