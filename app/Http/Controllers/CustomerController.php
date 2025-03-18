<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\Device;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $sortField = $request->input('sort_field', 'id');
        $sortDirection = $request->input('sort_direction', 'asc');
        $filters = $request->only('search');

        $data = Customer::query()
            ->whereAny([
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'mobile_no',
            ], 'like', '%'.$filters['search'].'%' ?? '')
            ->orderBy($sortField, $sortDirection)
            ->paginate(perPage: $perPage, page: $page);

        return Inertia::render('customers/index', [
            'data' => $data,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('customers/create', [
            'plans' => Plan::all(),
            'devices' => Device::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->validated());
        $customer->devices()->sync($request->input('devices'));

        return to_route('customers.index')->with('status', 'Customer created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $customer->load('devices');

        return Inertia::render('customers/show', [
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        $customer->load('devices', 'plan');

        return Inertia::render('customers/edit', [
            'plans' => Plan::all(),
            'devices' => Device::all(),
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());
        $customer->devices()->sync($request->input('devices'));

        return to_route('customers.index')->with('status', 'Customer updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index');
    }
}
