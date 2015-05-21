<?php
namespace models;

class LayoutData{
    static function GetNavbarItems(){
        return [
            [ "name" => "Портфолио",           "href" => "/projects"],
            [ "name" => "Контакты",        "href" => "/contacts"],
        ];
    }
    static function GetSiteName(){
        return "Портфолио AGAtech";
    }
}

?>
