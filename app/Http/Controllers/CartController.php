<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
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
            $userName =Auth::user()->name;
            $carts = Cart::where('user_id', $userId)
                ->join('produks', 'carts.product_id', '=', 'produks.id')
                ->select(
                    'carts.*',
                    'produks.brand as product_brand',
                    'produks.productDescription as product_description',
                    'produks.harga as product_harga',
                    'produks.image as product_image',
                    (DB::raw("'$userName' as user_name"))
                )
                ->get();
        }



        return inertia('CartPage', [
            'carts' => $carts,
        ]);
    }

    // public function create()
    // {
    //     // Tampilkan form untuk membuat cart (jika diperlukan)
    //     return Inertia::render('CartPage');
    // }

    public function store(Request $request)
    {
        // Validasi request
        $validatedData = $request->validate([
            'product_id' => 'required|exists:produks,id',
            'status' => 'nullable|boolean',
            'user_id' => 'required|exists:users,id',
            'size' => 'required|string', // Sesuaikan dengan kebutuhan Anda
        ]);

        // Buat record baru di tabel carts
        Cart::create($validatedData);

        return Inertia::render('ProductPage', ['success' => 'Produk Berhasil Ditambahkan']);
        // return json('success', 'Produk berhasil ditambahkan.');
    }

    public function destroy(string $id)
    {
        // Temukan produk berdasarkan ID
        $cartItem = Cart::findOrFail($id);
        // Hapus produk
        $cartItem->delete();
        // return dd($cartItem);
        return back()->with([
            'message' => 'remove from cart',
        ]);
    }

    public function update(Request $request)
    {
        // Validasi request jika diperlukan

        // Ambil ID user yang sedang login
        $userId = auth()->id();

        // Update status checkout menjadi 1 (true) untuk semua cart dengan ID user yang sama dan status checkout 0
        Cart::where('user_id', $userId)
            ->where('checkout', 0)
            ->update(['checkout' => 1]);

        return back()->with([
            'message' => 'checkout success',
        ]);

    }

    public function updateStatus(Request $request)
    {
        // Validasi request jika diperlukan
        $id = $request->input('id');
        $cart = Cart::find($id);
        // return dd($cart);

        
        // Periksa apakah cart memiliki status 0 dan checkout 1
        if ($cart->status == 0 && $cart->checkout == 1) {
            // Update status menjadi 1 (true)
            $cart->update(['status' => 1]);
            
            return back()->with([
                'message' => 'Verified success',
            ]);
        }

        return back()->with([
            'error' => 'Invalid cart status',
        ]);

    }
}
