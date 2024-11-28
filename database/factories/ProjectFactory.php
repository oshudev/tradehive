<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid,
            'title' => $this->faker->sentence(),
            'client_id' => User::factory()->state(['role' => 'client']),
            'description' => $this->faker->sentence(),
            'budget' => $this->faker->randomFloat(2, 100, 1000),
            'status' => 'open',
        ];
    }
}
