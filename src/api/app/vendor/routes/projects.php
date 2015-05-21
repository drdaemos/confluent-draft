<?php
namespace app\routes;

$app->group("/projects",function () use ($app) {	
	$app->get('/', function() use ($app) {
		$app->view()->appendData(
	        array(
	        	'projects' => \models\ProjectsData::GetProjects(),
	        	'types' => \models\ProjectsData::GetTypes(),	        	
	            'viewName'=>'Проекты компании'
	        )
	    );
		$app->render('projects.twig');
	});
	$app->get('/:year', function($year) use ($app) {
		$app->view()->appendData(
	        array(
	        	'projects' => \models\ProjectsData::GetByYear($year),
	        	'types' => \models\ProjectsData::GetTypes(),
	            'viewName'=>"Проекты за $year год"
	        )
	    );
		$app->render('projectsByYear.twig');
	})->conditions(['year' => '(19|20)\d\d']);
	$app->get('/:tag', function($tag) use ($app) {
		$types = \models\ProjectsData::GetTypes();
		$app->view()->appendData(
	        array(
	        	'projects' => \models\ProjectsData::GetByTag($tag),
	        	'types' => $types,
	            'viewName'=> $tag == 'interesting' ? 'Интересные проекты' : 'Популярные проекты'
	        )
	    );
		$app->render('projectsByType.twig');
	})->conditions(['tag' => 'interesting|popular']);	
	$app->get('/:type', function($type) use ($app) {
		$types = \models\ProjectsData::GetTypes();
		$app->view()->appendData(
	        array(
	        	'projects' => \models\ProjectsData::GetByType($type),
	        	'types' => $types,
	            'viewName'=> \lib\Utils::ResolveArray($types, 'name', $type, 'link')
	        )
	    );
		$app->render('projectsByType.twig');
	});	
});
