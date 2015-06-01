<?php

$app->group('/tasks', function () use ($app) {
    $app->get('/', 'authorize', function () use ($app) {
        $items = \models\Tasks::getArray();
        $data = \models\Tasks::prepareArray($items);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });

    $app->get('/:id', 'authorize', function ($id) use ($app) {
        $item = \models\Tasks::getById($id);
        $data = \models\Tasks::prepare($item);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });   
});

$app->group('/comments', function () use ($app) {
    $app->get('/', 'authorize', function () use ($app) {
        $items = \models\TaskComments::getArray();
        $data = \models\TaskComments::prepareArray($items);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });

    $app->get('/:id', 'authorize', function ($id) use ($app) {
        $item = \models\TaskComments::getById($id);
        $data = \models\TaskComments::prepare($item);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });
});

$app->get('/taskstates', 'authorize', function () use ($app) {
    $data = \models\Tasks::getStates();
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->write(json_encode($data));
});   
