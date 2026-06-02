<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'cover_image',
        'author_name',
        'is_premium',
        'category',
        'is_deleted',
    ];

    protected $casts = [
        'is_premium' => 'boolean',
        'is_deleted' => 'boolean',
    ];

    protected static function booted()
    {
        static::addGlobalScope('not_deleted', function (Builder $builder) {
            $builder->where('posts.is_deleted', 0)->orWhereNull('posts.is_deleted');
        });
    }
}
