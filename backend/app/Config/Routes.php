<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('profile', 'UserController::profile', ['filter' => 'jwt']);

//Cors
$routes->options('(:any)', function() {
    return service('response')
        ->setStatusCode(200)
        ->setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

//admin
$routes->post('register', 'AuthController::register');
$routes->post('login', 'AuthController::login');


//product
$routes->post('api/products', 'ProductController::create');
$routes->get('api/products', 'ProductController::index');
