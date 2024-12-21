<?php

namespace Database\Seeders;

use App\Enums\TransactionType;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::create([
            'user_id' => 1,
            'category_id' => 1, // Salary
            'type' => TransactionType::INCOME->value,
            'amount' => 1000,
            'transaction_date' => now(),
        ]);

        Transaction::create([
            'user_id' => 1,
            'category_id' => 3, // Groceries
            'type' => TransactionType::EXPENSE->value,
            'amount' => 200,
            'transaction_date' => now(),
        ]);
    }
}
