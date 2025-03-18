<?php

it('fetches all customers', function () {
    $response = $this->get('/customers');

    $response->assertStatus(200);
});
