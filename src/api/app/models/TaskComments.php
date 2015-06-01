<?php

namespace models;

class TaskComments
{
    use \models\CrudOperations;

    const DB_TABLE = 'tasks_comments';

    public static function prepare($item)
    {
        if (!is_array($item)) {
            $result = $item->asArray();
        } else {
            $result = $item;
        }

        return $result;
    }

    public static function prepareArray($array)
    {
        foreach ($array as &$item) {
            $item = static::prepare($item);
        }
        return $array;
    }
}
