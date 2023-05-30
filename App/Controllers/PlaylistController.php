<?php

namespace App\Controllers;

use Twig\Environment;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class PlaylistController
{
    private Environment $view;
    public function __construct(Environment $view)
    {
        $this->view = $view;
    }

    public function get(Request $request, Response $response): Response
    {
        $playlist = [
            [
                'artist' => 'Artik & Asti',
                'track' => 'Чувства',
                'path' => '/music/Chuvstva.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Девочка танцуй',
                'path' => '/music/Devochka tancuj.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Крылья',
                'path' => '/music/Kryl\'ya.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Незаменимы',
                'path' => '/music/Nezamenimy.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Обесточено',
                'path' => '/music/Obestocheno.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Последний поцелуй',
                'path' => '/music/Poslednij poceluj.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
            [
                'artist' => 'Artik & Asti',
                'track' => 'Все мимо',
                'path' => '/music/Vse mimo.mp3',
                'image' => [
                    'small' => '/img/artik&asti.jpeg',
                    'big' => '/img/artik&asti.jpeg'
                ]
            ],
        ];

        $response->getBody()->write(json_encode($playlist));
        return $response->withHeader("Content-Type", "application/json");
    }
}