<?php

$app->group('/tasks', function () use ($app) {
    $app->get('/', 'authorize', function () use ($app) {
        $items = \models\Tasks::getArray();
        $app->log->debug($items);
        $data = \models\Tasks::prepareArray($items);
        $app->log->debug($data);
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

    $app->put('/', 'authorize', function () use ($app) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);

        $comment = \models\TaskComments::create();
        $comment->created_id = $data['created_id'];
        $comment->created_date = $data['created_date'];
        $comment->message = $data['message'];
        $comment->task_id = $data['task_id'];
        $comment->save();    
        
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode(array('success' => 'new project was created')));
    });
});

$app->get('/taskstates', 'authorize', function () use ($app) {
    $data = \models\Tasks::getStates();
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->write(json_encode($data));
});   
