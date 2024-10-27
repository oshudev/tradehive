<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        return [
            'id' => (string) Str::uuid(), // Generates a UUID for the id
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'role' => $this->faker->randomElement(['client', 'freelancer']),
            'email' => $this->faker->unique()->safeEmail(),
            'avatar' => $this->faker->imageUrl(200, 200, 'people', true, 'Avatar'), // Generates a random avatar URL
            'remember_token' => Str::random(10),
        ];
    }
}
