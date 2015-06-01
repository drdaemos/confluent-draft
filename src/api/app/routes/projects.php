<?php

$app->group('/projects', function () use ($app) {
    $app->get('/', 'authorize', function () use ($app) {
        $items = \models\Projects::getArray();
        $data = \models\Projects::prepareArray($items);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });

    $app->get('/:id', 'authorize', function ($id) use ($app) {
        $item = \models\Projects::getById($id);
        $data = \models\Projects::prepare($item);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });   
});

$app->get('/projectstates', 'authorize', function () use ($app) {
    $data = \models\Projects::getStates();
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->write(json_encode($data));
});   
