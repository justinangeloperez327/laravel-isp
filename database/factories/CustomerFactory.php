<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
final class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'registration_date' => $this->faker->date(),
            'first_name' => $this->faker->firstName,
            'middle_name' => $this->faker->optional()->firstName,
            'last_name' => $this->faker->lastName,
            'mobile_no' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'floor_or_unit' => $this->faker->buildingNumber,
            'street' => $this->faker->streetName,
            'compound_or_building' => $this->faker->secondaryAddress,
            'barangay' => $this->faker->streetSuffix,
            'municipality_or_city' => $this->faker->city,
            'province' => $this->faker->state,
            'plan_id' => 1,
            'billing_due' => $this->faker->randomElement([15, 30]),
        ];
    }

    public function withDevices(): self
    {
        return $this->afterCreating(function (Customer $customer) {
            $customer->devices()->sync([
                $this->faker->numberBetween(1, 5),
                $this->faker->numberBetween(1, 5),
                $this->faker->numberBetween(1, 5),
            ]);
        });
    }
}
