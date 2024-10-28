<?php

namespace Database\Factories;

use App\Models\AuthAccount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuthAccount>
 */
class AuthAccountFactory extends Factory
{
    protected static ?string $password;

    protected $model = AuthAccount::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'provider' => $this->faker->randomElement(['password', 'google']),
            'provider_account_id' => Str::random(10),
            'secret' => $this->faker->password(),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
