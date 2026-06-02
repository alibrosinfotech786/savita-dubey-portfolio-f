<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    public function index()
    {
        return response()->json(Package::get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string',
            'price'        => 'required|numeric',
            'description'  => 'nullable|string',
            'duration_days'=> 'required|integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . uniqid();
        $package = Package::create($validated);
        return response()->json($package, 201);
    }

    public function update(Request $request, $id)
    {
        $package = Package::findOrFail($id);
        $package->update($request->only(['name', 'price', 'description', 'duration_days']));
        return response()->json($package);
    }

    public function destroy(Request $request, $id)
    {
        $package = Package::findOrFail($id);
        $package->update(['is_deleted' => 1]);
        return response()->json(['message' => 'Package deleted']);
    }
}
