<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Twig\Environment;

class PageController
{
    private Environment $view;
    public function __construct(Environment $view)
    {
        $this->view = $view;
    }

    public function index(Request $request, Response $response, $args): Response
    {
        $body = $this->view->render('pages/index.twig', ['origin' => $request->getUri()]);
        $response->getBody()->write($body);
        return $response;
    }
}