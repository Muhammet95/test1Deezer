<?php


use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use function DI\autowire;
use function DI\get;

return [
    FilesystemLoader::class => autowire()->constructorParameter('paths', __DIR__ . '/../views'),
    Environment::class => autowire()->constructorParameter('loader', get(FilesystemLoader::class))
];