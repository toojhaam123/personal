<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'tungpro', // Cột này Tùng có nè
            'fullname' => 'Hạng A Tùng', // Đổi từ 'name' thành 'fullname'
            'email' => 'test@example.com',
            'password' => bcrypt('123456'), // Thêm password nếu cần
        ]);
    }
}
