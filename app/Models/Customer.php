<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Customer extends Model
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
        'registration_date' => 'date:Y-m-d',
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'billing_due' => 'integer',
    ];

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

    public function billings(): HasMany
    {
        return $this->hasMany(Billing::class);
    }
}
