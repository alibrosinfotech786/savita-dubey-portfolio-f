<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Package extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'description',
        'duration_days',
        'is_deleted',
    ];

    protected $casts = [
        'is_deleted'    => 'boolean',
        'duration_days' => 'integer',
    ];

    protected static function booted()
    {
        static::addGlobalScope('not_deleted', function (Builder $builder) {
            $builder->where('packages.is_deleted', 0);
        });
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_packages')->withPivot('starts_at', 'expires_at');
    }
}
