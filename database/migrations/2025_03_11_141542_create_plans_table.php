<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('data')->default('unlimited');
            $table->string('speed');
            $table->decimal('price', 8, 2)->default(0);
            $table->enum('type', ['wireless', 'fiber']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('plans')->insert([
            [
                'name' => '35MBPS',
                'description' => '35mbps fiber internet speed',
                'speed' => '35mbps',
                'data' => 'unlimited',
                'price' => 888,
                'type' => 'fiber',
            ],
            [
                'name' => '50MBPS',
                'description' => '50mbps fiber internet speed',
                'speed' => '50mbps',
                'data' => 'unlimited',
                'price' => 999,
                'type' => 'fiber',
            ],
            [
                'name' => '100MBPS',
                'description' => '100mbps fiber internet speed',
                'speed' => '100mbps',
                'data' => 'unlimited',
                'price' => 1399,
                'type' => 'fiber',
            ],
            [
                'name' => '200MBPS',
                'description' => '200mbps fiber internet speed',
                'speed' => '200mbps',
                'data' => 'unlimited',
                'price' => '1888',
                'type' => 'fiber',
            ],
            [
                'name' => '15MBPS',
                'description' => '15mbps wireless internet speed',
                'speed' => '15mbps',
                'data' => 'unlimited',
                'price' => '999',
                'type' => 'wireless',
            ],
            [
                'name' => '30MBPS',
                'description' => '30mbps wireless internet speed',
                'speed' => '30mbps',
                'data' => 'unlimited',
                'price' => '1199',
                'type' => 'wireless',
            ],
            [
                'name' => '40MBPS',
                'description' => '40mbps wireless internet speed',
                'speed' => '40mbps',
                'data' => 'unlimited',
                'price' => '999',
                'type' => 'wireless',
            ],
            [
                'name' => '50MBPS',
                'description' => '50mbps wireless internet speed',
                'speed' => '50mbps',
                'data' => 'unlimited',
                'price' => '1699',
                'type' => 'wireless',
            ],
        ]);
    }
};
