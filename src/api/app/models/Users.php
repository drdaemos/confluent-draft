<?php

namespace models;

class Users
{
    use \models\CrudOperations;

    const DB_TABLE = 'users';

    public static function generateToken()
    {
        return bin2hex(openssl_random_pseudo_bytes(32));
    }

    public static function getHash($password)
    {
        return password_hash($password, \PASSWORD_BCRYPT);
    }

    public static function checkAuth(){
        $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
        $authToken = isset($_SESSION['auth_token']) ? $_SESSION['auth_token'] : null;
        if ($userId && $authToken) {
            $user = static::getSingle(
                array(
                    'id' => $userId,
                    'auth_token' => $authToken,
                )
            );
        }
        if (!empty($user)) {
            return $user;
        } else {
            return false;
        }
    }
}
