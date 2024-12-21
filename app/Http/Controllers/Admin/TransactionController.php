<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => auth()->user()->transactions()->with('category')->paginate(10)
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
}
