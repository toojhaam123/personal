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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->string('avatar')->nullable();
            $table->string('fullname')->nullable();
            $table->string('birth')->nullable();
            $table->string('address')->nullable();
            $table->string('link_address')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('facebook')->nullable();
            $table->string('link_facebook')->nullable();
            $table->string('github')->nullable();
            $table->string('link_github')->nullable();
            $table->string('website')->nullable();
            $table->string('link_website')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
