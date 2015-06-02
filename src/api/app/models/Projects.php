<?php

namespace models;

class Projects
{
    use \models\CrudOperations;

    const DB_TABLE = 'projects';
    const DB_TABLE_USERS = 'users_projects';
    const DB_TABLE_STATES = 'projects_states';

    public static function prepare($item)
    {
        if (!is_array($item)) {
            $result = $item->asArray();
        } else {
            $result = $item;
        }
        $result['managed_id'] = static::getManaged($item);

        return $result;
    }

    public static function prepareArray($array)
    {
        foreach ($array as &$item) {
            $item = static::prepare($item);
        }
        return $array;
    }

    public static function getManaged($project)
    {
        $query = \ORM::for_table(static::DB_TABLE_USERS);
        $user = $query->where(['project_id' => $project['id']])->findOne();

        if (!empty($user)) {
            return $user->user_id;
        } else {
            return 0;
        }
    }

    public static function getStates(){
        $query = \ORM::for_table(static::DB_TABLE_STATES);
        $items = $query->findArray();

        return $items;
    }
}
