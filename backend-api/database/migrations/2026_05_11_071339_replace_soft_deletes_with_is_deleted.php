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
        $tables = ['users', 'posts', 'packages', 'payments', 'user_packages'];
        foreach ($tables as $name) {
            Schema::table($name, function (Blueprint $table) {
                $table->boolean('is_deleted')->default(0);
            });
        }

        // Standard Laravel SoftDeletes cleanup
        Schema::table('users', function (Blueprint $table) { $table->dropColumn('deleted_at'); });
        Schema::table('posts', function (Blueprint $table) { $table->dropColumn('deleted_at'); });
        Schema::table('packages', function (Blueprint $table) { $table->dropColumn('deleted_at'); });
        Schema::table('payments', function (Blueprint $table) { $table->dropColumn('deleted_at'); });
        Schema::table('user_packages', function (Blueprint $table) { $table->dropColumn('deleted_at'); });
    }

    public function down(): void
    {
        $tables = ['users', 'posts', 'packages', 'payments', 'user_packages'];
        foreach ($tables as $name) {
            Schema::table($name, function (Blueprint $table) {
                $table->dropColumn('is_deleted');
                $table->softDeletes();
            });
        }
    }
};
