<?php

define("DB_VERSION", "0.0.5");
define("DB_FILE", "./config/app.db");

// Slim configuration
$app->configureMode('production', function () use ($app) {
    $app->config(array(
        'view' => new \Slim\Views\Twig(),
        'templates.path' => 'views',
        'log.enabled' => true,
        'log.level' => \Slim\Log::DEBUG,
        'debug' => true,
        'log.writer' => new \Slim\Logger\DateTimeFileWriter(array(
            'path' => './logs',
            'name_format' => 'Y-m-d',
            'extension' => 'log',
            'message_format' => '%label% - %date% - %message%'
        ))
    ));
    $twig = $app->view->getInstance();
    $twig->addFilter(new Twig_SimpleFilter('resolve', '\lib\Utils::ResolveArray'));
});

//Database configuration
connectDatabase();
checkSchema();

function connectDatabase()
{
    ORM::configure('sqlite:'.constant("DB_FILE"));
}

function checkSchema()
{
    global $app;
    $app->log->info("Checking schema.");
    try {
        $version = ORM::for_table('options')->where('key', 'db_version')->find_one();
        $app->log->info("Database file version - ".$version->value);
        $app->log->info("Database schema version - ".constant("DB_VERSION"));
        if ($version->value !== constant("DB_VERSION")) {
            $app->log->error("File version doesn't match schema version. Schema will be regenerated.");
            generateSchema();
        }
    } catch (PDOException $e) {
        $app->log->error("Database read error. Schema will be regenerated.");
        generateSchema();
    }
    $app->log->info("Check finished.");
}

function clearDatabase()
{
    global $app;
    $app->log->info("Clearing database.");
    ORM::set_db(null);
    rename(constant("DB_FILE"), constant("DB_FILE").".corrupt");
    connectDatabase();
}
function generateSchema()
{
    global $app;
    $app->log->info("Generating schema.");
    clearDatabase();

    $schema = file_get_contents('./config/schema.sql');
    //version
    ORM::get_db()
        ->exec($schema);
    $version_record = ORM::for_table('options')->create();
    $version_record->key = 'db_version';
    $version_record->value = constant("DB_VERSION");
    $version_record->save();

    generateData();
}
function generateData()
{
    global $app;
    $app->log->info("Generating data.");
    //types
    $data = file_get_contents('./config/demo_data.sql');
    //version
    ORM::get_db()
        ->exec($data);
}