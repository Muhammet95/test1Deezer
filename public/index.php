<?php

use DevCoder\DotEnv;
use Slim\Factory\AppFactory;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require __DIR__ . '/../vendor/autoload.php';
//(new DotEnv(__DIR__ . '/../.env'))->load();

$loader = new FilesystemLoader(__DIR__ . '/../views');
$view = new Environment($loader);

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) use ($view) {
    $body = $view->render('pages/index.twig');
    $response->getBody()->write($body);
    return $response;
});

$app->run();