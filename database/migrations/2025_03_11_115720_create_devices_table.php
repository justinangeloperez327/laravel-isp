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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['router', 'switch', 'access point', 'radio antenna']);
            $table->timestamps();
        });

        DB::table('devices')->insert([
            [
                'name' => 'LBE-GEN2 S/N',
                'type' => 'radio antenna',
            ],
            [
                'name' => 'POWER BEAM GEN2 S/N',
                'type' => 'radio antenna',
            ],
            [
                'name' => '5V5 V1',
                'type' => 'router',
            ],
            [
                'name' => '5V5 V2',
                'type' => 'router',
            ],
            [
                'name' => '5V6-10',
                'type' => 'router',
            ],
        ]);
    }
};
