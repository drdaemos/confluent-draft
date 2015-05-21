<?php
//Load 404 Route
$app->notFound(function () use ($app) {
    $request = $app->request();
    $requesturi = 'http://'.$_SERVER["HTTP_HOST"].$request->getRootUri().$request->getResourceUri();
});
