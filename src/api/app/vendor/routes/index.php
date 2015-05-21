<?php
namespace app\routes;
$app->get('/', function() use ($app) {
	$app->view()->appendData(
        array(
        	'latest' => \models\ProjectsData::GetProjects(3),
        	'cases' => \models\ProjectsData::GetByType('cases', 3),
        	'interesting' => \models\ProjectsData::GetByTag('interesting',3),
            'viewName'=>'Главная'
        )
    );
	$app->render('index.twig');
});
