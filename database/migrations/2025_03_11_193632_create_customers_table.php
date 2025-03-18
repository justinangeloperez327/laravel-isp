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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->date('registration_date');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('mobile_no');
            $table->string('email')->unique();

            // address
            $table->string('floor_or_unit')->nullable();
            $table->string('street')->nullable();
            $table->string('compound_or_building')->nullable();
            $table->string('barangay')->nullable();
            $table->string('municipality_or_city')->nullable();
            $table->string('province')->nullable();

            // subscription
            $table->foreignId('plan_id')->constrained();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', ['pending', 'connected', 'disconnected'])->default('pending');

            // fiber number slot
            $table->string('lp')->nullable();
            $table->string('np')->nullable();
            $table->string('slot')->nullable();

            // 15nth or 30th
            $table->integer('billing_due')->default(15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
