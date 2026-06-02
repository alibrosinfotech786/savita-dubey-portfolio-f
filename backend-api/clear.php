<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$commands = [
    'config:clear',
    'cache:clear',
    'route:clear',
    'view:clear',
    'optimize:clear',
];

foreach ($commands as $command) {
    $kernel->call($command);
    echo "✔ $command executed<br>";
}

echo "<h3>All Laravel caches cleared!</h3>";
