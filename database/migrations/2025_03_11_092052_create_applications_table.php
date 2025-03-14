<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            // personal info
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('mobile_no');
            $table->string('email')->unique();
            $table->boolean('is_active')->default(false);

            // address
            $table->string('floor_or_unit')->nullable();
            $table->string('street')->nullable();
            $table->string('compound_or_bldg')->nullable();
            $table->string('barangay')->nullable();
            $table->string('municipality_or_city')->nullable();
            $table->string('province')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
