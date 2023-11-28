<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ProductPage');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'brand' => 'required|string',
            'harga' => 'required|numeric',
            'kategori' => 'required|string',
            'tipe' => 'required|string',
            'productDescription' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        // return dd($request->hasFile('image'));

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images'), $imageName);
            $validatedData['image'] = 'images/' . $imageName; // Simpan path relatif di database
        }

        Produk::create($validatedData);

        // $url = URL::route('produk.form');

        return redirect()->back()->with('success', 'Produk berhasil disimpan.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // Ambil nilai tipe dan kategori dari request
        $tipe = $request->input('tipe');
        $kategori = $request->input('kategori');
        
        // Query awal tanpa filter
        $query = Produk::query();
        
        // Filter berdasarkan tipe jika tipe dimasukkan
        if ($tipe) {
            $query->where('tipe', $tipe);
            // return dd($tipe);
        }
        
        // Filter berdasarkan kategori jika kategori dimasukkan
        if ($kategori) {
            $query->where('kategori', $kategori);
            // return dd($kategori);
        }
        
        // Ambil hasil query
        $produk = $query->get();

        // Render halaman dengan produk yang telah difilter atau semua produk jika tidak ada filter
        return Inertia::render('ProductPage', ['produk' => $produk]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Menghapus kunci yang tidak ada dalam array dari formulir
        $requestData = array_filter($request->all());

        $validatedData = Validator::make($requestData, [
            'brand' => 'nullable|string',
            'harga' => 'nullable|numeric',
            'kategori' => 'nullable|string',
            'tipe' => 'nullable|string',
            'productDescription' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ])->validate();

        $product = Produk::findOrFail($id);

        // Handle image update
        // return dd($request->hasFile('image'));
        if ($request->hasFile('image')) {
            // Delete the old image
            $imagePath = $product->image;
            if (File::exists(public_path($imagePath))) {
                File::delete(public_path($imagePath));
            }


            // Upload the new image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images'), $imageName);
            $validatedData['image'] = 'images/' . $imageName; // Save the relative path in the database
        }

        // Update the product details
        $product->update($validatedData);

        // return dd($product);
        return redirect()->back()->with('success', 'Produk berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Temukan produk berdasarkan ID
        $product = Produk::findOrFail($id);

        // Hapus gambar terkait jika ada
        if (File::exists(public_path($product->image))) {
            File::delete(public_path($product->image));
        }

        // Hapus baris produk dari database
        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }
}
