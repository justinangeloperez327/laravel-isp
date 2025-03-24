<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        $perPage       = $request->input('per_page', 10);
        $page          = $request->input('page', 1);
        $sortField     = $request->input('sort_field', 'id');
        $sortDirection = $request->input('sort_direction', 'asc');
        $filters       = $request->only('search');

        $billingDue = $request->has('billing_due') ? (int) $request->input('billing_due') : 30;

        if (! $billingDue) {
            return Inertia::render('billing/index', [
                'customers' => [],
            ]);
        }

        $data = Customer::query()
            ->with(['plan', 'billings' => function ($query) {
                $query->latest();
            }])
            ->where('billing_due', $billingDue)
            ->select([
                'id',
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
                'billing_due',
            ])
            ->when($request->has('search'), function ($query) use ($filters) {
                $query->where('first_name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('middle_name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('last_name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('mobile_no', 'like', '%'.$filters['search'].'%')
                    ->orWhere('email', 'like', '%'.$filters['search'].'%');
            })
            ->orderBy($sortField, $sortDirection)

            ->paginate(perPage: $perPage, page: $page);

        // Apply the map function to the paginated data
        $data->getCollection()->transform(function ($customer) use ($billingDue) {
            // Generate or get existing billing for the current month
            $currentBilling = $this->getOrGenerateBilling($customer, $billingDue);

            return [
                'id'             => $customer->id,
                'name'           => $customer->full_name,
                'address'        => $customer->full_address,
                'jo_number'      => 'JO-'.str_pad($customer->id, 5, '0', STR_PAD_LEFT),
                'bill'           => $currentBilling->amount ?? $customer->plan->price ?? 0,
                'contact_number' => $customer->mobile_no,
                'plan'           => $customer->plan->name     ?? 'No Plan',
                'billing_due'    => $currentBilling->due_date ?? null,
                'status'         => $currentBilling->status   ?? 'pending',
                'billing_id'     => $currentBilling->id       ?? null,
            ];
        });

        return Inertia::render('billing/index', [
            'data'    => $data,
            'filters' => $filters,
        ]);
    }

    protected function getOrGenerateBilling($customer, int $billingDue = 30)
    {
        if (! $customer->plan) {
            return null;
        }

        $now          = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth   = $now->copy()->endOfMonth();

        // Check if billing already exists for current month
        $existingBilling = Billing::where('customer_id', $customer->id)
            ->whereBetween('billing_period_start', [$startOfMonth, $endOfMonth])
            ->first();

        if ($existingBilling) {
            return $existingBilling;
        }

        // Generate new billing
        $dueDate = $now->copy()->addMonth()->setDay($billingDue);

        // If we've already passed the due day this month, move to next month
        if ($dueDate->isPast()) {
            $dueDate->addMonth();
        }

        return Billing::create([
            'customer_id'          => $customer->id,
            'plan_id'              => $customer->plan_id,
            'amount'               => $customer->plan->price,
            'due_date'             => $dueDate,
            'status'               => 'pending',
            'billing_period_start' => $startOfMonth,
            'billing_period_end'   => $endOfMonth,
        ]);
    }

    public function edit(Customer $customer)
    {
        $customer->load('plan');

        return Inertia::render('billing/edit', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'plan_id'     => ['required', 'exists:plans,id'],
            'billing_due' => ['required', 'in:15,30'],
        ]);

        $billing = Billing::where('customer_id', $customer->id)
            ->where('status', 'pending')
            ->latest()
            ->first();

        $customer->update($request->only(['plan_id', 'billing_due']));

        return redirect()->route('billing.index')->with('status', 'Billing updated successfully!');
    }
}
