<?php

namespace app\routes;

$app->group('/auth', function () use ($app) {
    $app->get('/', function () use ($app) {
        $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
        $authToken = isset($_SESSION['auth_token']) ? $_SESSION['auth_token'] : null;
        if ($userId && $authToken) {
            $user = \ORM::forTable('users')->where(
                array(
                    'id' => $userId,
                    'auth_token' => $authToken,
                )
            )->findOne();
        }
        if (!empty($user)) {
            $data = $user->asArray();
            unset($data['password']);
            unset($data['auth_token']);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($data));
        } else {
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode(array('error' => 'no user was found')));
        }
    });
    $app->post('/login', function () use ($app) {
        $username = $app->request->post('username');
        $password = $app->request->post('password');

        if ($username && $password) {
            $user = \ORM::forTable('users')->where('username', $username)->findOne();
        }

        if (!empty($user) && password_verify($password, $user->password)) {
            $user->auth_token = bin2hex(openssl_random_pseudo_bytes(32));
            $user->save();
            $_SESSION['user_id'] = $user->id;
            $_SESSION['auth_token'] = $user->auth_token;

            $data = $user->asArray();
            unset($data['password']);
            unset($data['auth_token']);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($data));
        } else {
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode(array('error' => 'Invalid username or password.')));
        }
    });
    $app->post('/signup', function () use ($app) {
        $username = $app->request->post('username');
        $name = $app->request->post('name');
        $password = $app->request->post('password');

        if ($username && $password) {
            $user = \ORM::forTable('users')->where('username', $username)->findOne();
        }

        if (!empty($user)) {
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode(array('error' => 'Username has been taken.')));
        } else {
            $user = \ORM::forTable('users')->create();
            $user->username = $username;
            $user->name = $name;
            $user->password = password_hash($password, \PASSWORD_BCRYPT);
            $user->auth_token = bin2hex(openssl_random_pseudo_bytes(32));
            $user->save();

            $_SESSION['user_id'] = $user->id;
            $_SESSION['auth_token'] = $user->auth_token;

            $data = $user->asArray();
            unset($data['password']);
            unset($data['auth_token']);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($data));
        }
    });
    $app->post('/logout', function () use ($app) {
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(), '', 0, '/');
        session_regenerate_id(true);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->write(json_encode(array('success' => 'User successfully logged out.')));
    });
});
