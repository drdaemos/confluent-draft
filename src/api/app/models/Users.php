<?php

namespace models;

class Users
{
    use \models\CrudOperations;

    const DB_TABLE = 'users';
    const DB_TABLE_ROLES = 'users_roles';

    // overrides

    // end of overrides

    public static function clean($item)
    {
        unset($item['password'], $item['auth_token']);
        return $item;
    }

    public static function cleanArray($array)
    {
        foreach ($array as &$item) {
            $item = static::clean($item);
        }
        return $array;
    }

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
    
    public static function getRoles(){
        $query = \ORM::for_table(static::DB_TABLE_ROLES);
        $items = $query->findArray();

        return $items;
    }
}
