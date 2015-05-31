<?php

namespace models;

trait CrudOperations
{
    public static function getMany($qty = null)
    {
        $query = \ORM::for_table(static::DB_TABLE);
        if (!empty($qty)) {
            $query->limit($qty);
        }
        $items = $query->findMany();

        return $items;
    }

    public static function getArray($qty = null)
    {
        $query = \ORM::for_table(static::DB_TABLE);
        if (!empty($qty)) {
            $query->limit($qty);
        }
        $items = $query->findArray();

        return $items;
    }

    public static function getSingle($params = null)
    {
        $query = \ORM::for_table(static::DB_TABLE);
        if (!empty($params)) {
            $query->where($params);
        }
        $item = $query->findOne();

        return $item;
    }

    public static function getById($id)
    {
        $item = static::getSingle(
            ['id' => $id]
        );
        return $item;
    }

    public static function create()
    {
        $item = \ORM::for_table(static::DB_TABLE)->create();
        return $item;
    }

    public static function update($item, $id)
    {
        $db_item = static::getById($id);

        if (empty($item)) {
            throw new \Exception('Item not found');
        }

        foreach ($item as $key => $value) {
            if (empty($value)) {
                unset($item[$key]);
            }
        }

        $db_item->set($item);
        $db_item->save();
    }

    public static function delete($id)
    {
        $db_item = static::getById($id);

        if (empty($item)) {
            throw new \Exception('Item not found');
        }
        
        $db_item->delete();
    }
}
