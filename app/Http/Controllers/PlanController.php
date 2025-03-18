<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlanRequest;
use App\Http\Requests\UpdatePlanRequest;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
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

        $data = Plan::query()
            ->when($request->has('search'), function ($query) use ($filters) {
                $query->where('name', 'like', '%'.$filters['search'].'%')
                    ->orWhere('price', 'like', '%'.$filters['search'].'%');
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(perPage: $perPage, page: $page);

        return Inertia::render('plans/index', [
            'data' => $data,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('plans/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlanRequest $request)
    {
        Plan::create($request->validated());

        return redirect()->route('plans.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        return Inertia::render('plans/show', [
            'plan' => $plan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        return Inertia::render('plans/edit', [
            'plan' => $plan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanRequest $request, Plan $plan)
    {
        $plan->update($request->validated());

        return redirect()->route('plans.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        $plan->delete();

        return redirect()->route('plans.index');
    }
}
