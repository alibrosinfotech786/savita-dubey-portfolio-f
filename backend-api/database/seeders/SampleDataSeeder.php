<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Package;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Users
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        $user = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => Hash::make('user123'),
                'role' => 'user',
            ]
        );

        // 2. Create Packages
        $basic = Package::updateOrCreate(
            ['slug' => 'basic-plan'],
            [
                'name' => 'Basic Plan',
                'price' => 19.99,
                'description' => 'Access to general financial insights.',
                'duration_days' => 30,
            ]
        );

        $premium = Package::updateOrCreate(
            ['slug' => 'premium-access'],
            [
                'name' => 'Premium Access',
                'price' => 49.99,
                'description' => 'Full access to all technical deep-dives and governance reports.',
                'duration_days' => 30,
            ]
        );

        // 3. Create Posts
        Post::updateOrCreate(
            ['slug' => 'global-finance-trends-2026'],
            [
                'title' => 'Global Finance Trends 2026',
                'content' => 'This is a public blog post about the upcoming trends in global finance. It contains useful information accessible to everyone.',
                'excerpt' => 'A look ahead at the financial landscape of 2026.',
                'author_name' => 'Savita Dubey',
                'is_premium' => false,
                'category' => 'Finance',
            ]
        );

        Post::updateOrCreate(
            ['slug' => 'advanced-compliance-frameworks'],
            [
                'title' => 'Advanced Compliance Frameworks',
                'content' => 'This is PREMIUM CONTENT. Detailed breakdown of Tier-1 regulatory compliance structures and ethical leadership mandates. This content is only visible to active package holders.',
                'excerpt' => 'Deep dive into complex compliance structures.',
                'author_name' => 'Savita Dubey',
                'is_premium' => true,
                'category' => 'Compliance',
            ]
        );

        // 4. Assign Package to the regular user (optional, for testing content unlock)
        $user->packages()->syncWithoutDetaching([
            $premium->id => [
                'starts_at' => now(),
                'expires_at' => now()->addDays(30),
            ]
        ]);
    }
}
