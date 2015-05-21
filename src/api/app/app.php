<?php
    namespace app;

    session_cache_limiter(false);
    session_start();
    chdir('app');
    //Register lib autoloader
    require_once 'vendor/autoload.php';

    $app = new \Slim\Slim(array(
        'mode' => 'production'
    ));

    //Loads all needed subfiles
    require_once 'bootstrap.php';

    // Prepare view
    $app->view->parserOptions = array(
        'debug' => true,
        'cache' => $app->config('cache'),
    );
    $app->view->parserExtensions = array(
        new \Slim\Views\TwigExtension(),
    );

    //Run
    $app->run();
