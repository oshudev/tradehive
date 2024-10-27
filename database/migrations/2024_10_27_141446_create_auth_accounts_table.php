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
        Schema::create('auth_accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('provider');
            $table->string('provider_account_id');
            $table->string('secret')->nullable();
            $table->foreignUuid('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auth_accounts');
    }
};
