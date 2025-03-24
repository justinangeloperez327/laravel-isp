<?php

use App\Models\Customer;
use App\Models\User;

use function Pest\Laravel\get;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeAll(function () {
    Customer::factory()
        ->count(100)
        ->create();

});

describe('CustomerController', function () {
    it('returns a successful response', function () {
        $user = User::factory()->create();

        get('/customers')
            ->assertOk();
    });
});
