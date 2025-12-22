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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->uniqid();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('fullname')->nullable();
            $table->string('job_title')->nullable();
            $table->string('birth')->nullable();
            $table->string('address')->nullable();
            $table->string('link_address')->nullable();
            $table->string('phone')->nullable();
            $table->string('facebook')->nullable();
            $table->string('link_facebook')->nullable();
            $table->string('github')->nullable();
            $table->string('link_github')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar',
                'fullname',
                'job_title',
                'birth',
                'address',
                'link_address',
                'phone',
                'facebook',
                'link_facebook',
                'github',
                'link_github',
            ]);
        });
    }
};
