<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Admin/Transaction/Index', [
            'allTransactions' => auth()->user()->transactions()->with('category')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Transaction/Create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $transaction = Transaction::create($request->validated());

        if ($request->hasFile('image')) {
            $transaction->addMediaFromRequest('image')->toMediaCollection('invoices');
        }

        return redirect()->route('admin.transactions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Admin/Transaction/Edit', [
            'categories' => Category::all(),
            'transaction' => Transaction::with('category')->findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);

        $transaction->update($request->validated());

        if ($request->hasFile('image')) {
            $transaction->clearMediaCollection('invoices');
            $transaction->addMediaFromRequest('image')->toMediaCollection('invoices');
        }

        return redirect()->route('admin.transactions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);

        $transaction->delete();

        return redirect()->route('admin.transactions.index');
    }

    public function filter(Request $request)
    {
        $query = auth()->user()->transactions()->with('category');

        if ($request->filled('type')) {
            $query->filterType($request->type);
        }
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->filterDateRange($request->start_date, $request->end_date);
        }

        return $query->paginate(10);
    }

    public function chartData(Request $request)
    {
        $transactions = auth()->user()->transactions()->filterDateRange($request->start_date, $request->end_date)->get();

        $incomeExpense = $transactions->groupBy('type')->map(function ($group) {
            return $group->sum('amount');
        });

        $category = $transactions->groupBy('category.name')->map(function ($group) {
            return $group->sum('amount');
        });

        return response()->json([
            'income_expense' => $incomeExpense,
            'category' => $category,
        ]);
    }
}
