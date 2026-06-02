<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformSubscription extends Model
{
    protected $guarded = [];

    protected $casts = [
        'expiry_date' => 'datetime',
    ];

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function histories()
    {
        return $this->hasMany(PlatformSubscriptionHistory::class);
    }
}
