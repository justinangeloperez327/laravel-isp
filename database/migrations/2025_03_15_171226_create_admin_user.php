<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create admin user using User::create in users table
        User::create([
            'username' => 'admin',
            'password' => bcrypt('admin')
        ]);
    }
};
