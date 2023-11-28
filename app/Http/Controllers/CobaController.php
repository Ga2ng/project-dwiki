<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CobaController extends Controller
{
    public function index()
    {
        return Inertia::render('Coba', [
            'auth' => auth()->user(),
        ]);
    }
}
