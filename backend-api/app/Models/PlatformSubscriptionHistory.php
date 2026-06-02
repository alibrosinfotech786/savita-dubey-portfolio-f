<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlatformSubscriptionHistory extends Model
{
    protected $guarded = [];

    public function performer()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}
