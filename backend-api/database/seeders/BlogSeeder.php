<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                "slug" => "finance-governance-2026",
                "title" => "The Evolving Landscape of Financial Governance",
                "excerpt" => "An analysis of how regulatory frameworks are adapting to digital transformation and the increasing importance of robust governance in 2026.",
                "category" => "Finance",
                "cover_image" => "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
                "content" => "**The Shifting Governance Paradigm**\n\nFinancial governance has never been static...",
                "is_premium" => false,
                "author_name" => "Savita Dubey"
            ],
            [
                "slug" => "compliance-strategies-global-markets",
                "title" => "Strategic Compliance in Global Financial Markets",
                "excerpt" => "Practical insights into maintaining regulatory compliance across different jurisdictions.",
                "category" => "Compliance",
                "cover_image" => "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
                "content" => "**Why Compliance Strategy Matters**\n\nCompliance is often treated as a cost centre...",
                "is_premium" => true,
                "author_name" => "Savita Dubey"
            ]
        ];

        foreach ($blogs as $blog) {
            Post::create($blog);
        }
    }
}
