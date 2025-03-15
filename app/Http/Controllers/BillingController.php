<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Billing;
use App\Models\Customer;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        $billings = Billing::all();

        return Inertia::render('billing/index', [
            'billings' => $billings
        ]);
    }

    public function create()
    {
        $customers = Customer::all();

        return Inertia::render('billing/create', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required',
            'amount' => 'required',
            'status' => 'required',
        ]);

        Billing::create($request->all());

        return redirect()->route('billing.index');
    }
}
