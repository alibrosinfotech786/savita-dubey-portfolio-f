<?php

use Illuminate\Database\Migrations\Migration;

// Columns payment_id and status are already defined in the base
// create_user_packages_table migration. This migration is kept as a
// no-op to preserve the migration history without causing duplicate-column errors.
return new class extends Migration
{
    public function up(): void {}
    public function down(): void {}
};
