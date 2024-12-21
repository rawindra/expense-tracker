<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'User1',
            'email' => 'user1@example.com',
            'password' => bcrypt('password')
        ]);

        User::create([
            'name' => 'User2',
            'email' => 'user2@example.com',
            'password' => bcrypt('password')
        ]);
    }
}
