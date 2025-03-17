<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $table = 'billings';

    protected $fillable = [
        'customer_id',
        'subscription_id',
        'billing_date',
        'due_date',
        'amount',
        'remarks'
    ];

}
