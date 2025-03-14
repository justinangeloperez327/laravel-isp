<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
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
            'floor_or_unit' => $this->faker->optional()->buildingNumber,
            'street' => $this->faker->optional()->streetName,
            'compound_or_bldg' => $this->faker->optional()->secondaryAddress,
            'barangay' => $this->faker->optional()->streetSuffix,
            'municipality_or_city' => $this->faker->city,
            'province' => $this->faker->state,
        ];
    }
}
