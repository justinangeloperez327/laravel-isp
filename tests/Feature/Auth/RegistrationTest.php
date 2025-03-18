<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('render register page', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

it('register new user', function () {
    $response = $this->post('/register', [
        'username' => 'Test User',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});
