<?php

$app->group('/users', function () use ($app) {
    $app->get('/', 'authorize', function () use ($app) {
        $items = \models\Users::getArray();
        $data = \models\Users::cleanArray($items);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });

    $app->get('/:id', 'authorize', function ($id) use ($app) {
        $item = \models\Users::getById($id);
        $data = \models\Users::clean($item->asArray());
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode($data));
    });   
});
