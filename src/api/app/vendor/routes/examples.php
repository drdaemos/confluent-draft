<?php
namespace app\routes;

/**
 * Post route example
 */
$app->post('/examplePost', function() use ($app) {
    /**
     * STUB 'CAUSE EXAMPLE
     */
    $app->halt(500);
    /**
     * STUB 'CAUSE EXAMPLE
     */

    $app->response->headers->set('Content-Type', 'application/json');
        $param1           = $app->request->post("param1");
        $param2           = $app->request->post("param2");;
        if( empty($param1) ||
            empty($param2) ){
                $app->halt(422);
        };

        /**
         * Do something with posted data
         */

        $response = [
            "success" => true
        ];
        $app->response->write(json_encode($response));
});

/**
 * One Route to rule them all, One Route to find them,
 * One Route to bring them all and in the darkness bind them
 * In the Land of PHP where I sit and cry.
 */
$app->get('/:contentPage', function($contentPage) use ($app) {
    /**
     * STUB 'CAUSE EXAMPLE
     */
    $app->halt(500);
    /**
     * STUB 'CAUSE EXAMPLE
     */
    try {
        $app->render($contentPage.".twig");
    } catch (Exception $e) {
        $app->halt(404);
    }
});
