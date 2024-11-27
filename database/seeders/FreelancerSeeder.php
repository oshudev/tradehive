<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class FreelancerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->count(10)
            ->state([
                'role' => 'freelancer',
            ])
            ->create();
    }
}
