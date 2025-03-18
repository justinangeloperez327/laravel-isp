<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    protected $fillable = [
        'registration_date',
        'first_name',
        'middle_name',
        'last_name',
        'mobile_no',
        'email',

        'floor_or_unit',
        'street',
        'compound_or_building',
        'barangay',
        'municipality_or_city',
        'province',

        'plan_id',
        'start_date',
        'end_date',
        'status',

        'lp',
        'np',
        'slot',

        'billing_due',
    ];

    protected $casts = [
        'registration_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function subscriptions(): HasOne
    {
        return $this->hasOne(Subscription::class);
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }

    public function getFullAddressAttribute()
    {
        return "{$this->floor_or_unit} {$this->street} {$this->compound_or_bldg} {$this->barangay} {$this->municipality_or_city} {$this->province}";
    }

    public function devices(): BelongsToMany
    {
        return $this->belongsToMany(Device::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
