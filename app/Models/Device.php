<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    /** @use HasFactory<\Database\Factories\DeviceFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'mac_address',
        'serial_no',
        'model',
        'type',
        'status',
        'remarks',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
