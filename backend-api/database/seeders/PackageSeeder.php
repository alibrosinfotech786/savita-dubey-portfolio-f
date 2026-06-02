<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        Package::create([
            'name' => 'Monthly Reader',
            'slug' => 'monthly-reader',
            'price' => 10.00,
            'description' => 'Access to all premium blogs for 30 days',
            'duration_days' => 30,
        ]);

        Package::create([
            'name' => 'Annual Professional',
            'slug' => 'annual-professional',
            'price' => 99.00,
            'description' => 'Unlimited access to all content for a full year',
            'duration_days' => 365,
        ]);
    }
}
