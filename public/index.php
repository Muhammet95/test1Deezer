<?php

use App\Controllers\PageController;
use App\Controllers\PlaylistController;
use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$builder = new ContainerBuilder();
$builder->addDefinitions(__DIR__ . '/../config/di.php');
$container = $builder->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$app->get('/', PageController::class . ':index');
$app->get('/playlist', PlaylistController::class . ':get');
$app->run();