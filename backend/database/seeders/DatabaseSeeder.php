<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Insere usuários fictícios
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'phone' => '5511999999999', // Telefone fictício com código de país
        ]);

        User::create([
            'name' => 'Professor User',
            'email' => 'professor@example.com',
            'password' => Hash::make('password123'),
            'role' => 'professor',
            'phone' => '5511988888888', // Outro telefone fictício
        ]);

        User::create([
            'name' => 'Student User',
            'email' => 'student@example.com',
            'password' => Hash::make('password123'),
            'role' => 'estudante',
            'phone' => '44999994195', // Outro telefone fictício
        ]);
    }
}
