<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
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
            'project_id' => Project::where('status', 'open')->inRandomOrder()->value('id'), // Select a random open project
            'freelancer_id' => User::factory()->state(['role' => 'freelancer']),
            'bid_amount' => $this->faker->randomFloat(2, 100, 1000),
            'status' =>  'pending',      
        ];
    }
}
