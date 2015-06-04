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

    $app->put('/', 'authorize', function () use ($app) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);

        $project = \models\Projects::create();
        $project->name = $data['name'];
        $project->tag = $data['tag'];
        $project->started_date = $data['started_date'];
        $project->description = $data['description'];
        $project->client_data = $data['client_data'];
        $project->state_id = 1;    
        $project->save();    

        \models\Projects::setManaged($project->id(), $data['managed_id']);

        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode(array('success' => 'new project was created')));
    });
});

$app->get('/projectstates', 'authorize', function () use ($app) {
    $data = \models\Projects::getStates();
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->write(json_encode($data));
});   
