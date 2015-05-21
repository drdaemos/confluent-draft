<?php
namespace models;

class SliderData{
    static function GetSlides($dir){
        $slides = array();
        foreach(glob($_SERVER["DOCUMENT_ROOT"]."/".$dir."/preview/*") as $slide_path){
            $slides[] = array(
                "preview"  => "/".$dir."/preview/".basename($slide_path),
                "original" => "/".$dir."/original/".basename($slide_path));
        }
        return $slides;
    }
    static function GetSlidesRaw($dir){
        $slides = array();
        foreach(glob($_SERVER["DOCUMENT_ROOT"]."/".$dir."/*") as $slide_path){
            $slides[] = "/".$dir."/".basename($slide_path);
        }
        return $slides;
    }
}

?>
