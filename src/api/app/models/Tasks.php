<?php

namespace models;

class Tasks
{
    use \models\CrudOperations;

    const DB_TABLE = 'tasks';
    const DB_TABLE_USERS = 'users_tasks';
    const DB_TABLE_STATES = 'tasks_states';

    public static function prepare($item)
    {
        if (!is_array($item)) {
            $result = $item->asArray();
        } else {
            $result = $item;
        }
        $result['assigned_id'] = static::getAssigned($item);

        return $result;
    }

    public static function prepareArray($array)
    {
        foreach ($array as &$item) {
            $item = static::prepare($item);
        }
        return $array;
    }

    public static function getAssigned($task)
    {
        $query = \ORM::for_table(static::DB_TABLE_USERS);
        $user = $query->where(['task_id' => $task['id']])->findOne();

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
