<?php
/**
 * PHPUnit Test Bootstrap
 */

// Suppress session warnings in CLI
if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}

// Define base paths
// WWW_PATH is overridable because the tests directory is mounted outside the
// repo layout in the container (see docker-compose.yml)
define('BASE_PATH', dirname(__DIR__));
define('WWW_PATH', getenv('WWW_PATH') ? getenv('WWW_PATH') : BASE_PATH . '/www');
define('TESTS_PATH', __DIR__);

/**
 * Mock session for testing
 */
function mockSession($data = []) {
    $_SESSION = array_merge($_SESSION, $data);
}

/**
 * Clear session
 */
function clearSession() {
    $_SESSION = [];
}

/**
 * Mock POST data
 */
function mockPost($data = []) {
    $_POST = $data;
    $_SERVER['REQUEST_METHOD'] = 'POST';
}

/**
 * Clear POST data
 */
function clearPost() {
    $_POST = [];
    $_SERVER['REQUEST_METHOD'] = 'GET';
}
