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
        Schema::create('platform_subscription_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('platform_subscription_id')->constrained()->cascadeOnDelete();
            $table->string('action'); // e.g. renewed, suspended, updated_plan
            $table->text('details')->nullable();
            $table->foreignId('performed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('platform_subscription_histories');
    }
};
