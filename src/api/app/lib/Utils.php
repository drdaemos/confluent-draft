<?php
namespace lib;

class Utils{
	static function AddWatermarkIM($img_file, $filetype= 'default', $watermark = '/img/watermark.png'){
		$watermark = $_SERVER['DOCUMENT_ROOT'].$watermark;
		exec("composite -dissolve 70% -tile $watermark $img_file $img_file");
	}
	static function ResizeAndCompress($img_file){
		exec("convert $img_file -resize 900x900\> -quality 75 $img_file");
	}
	static function CreatePath($path) {
		if (is_dir($path)) return true;
		$prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
		$return = self::CreatePath($prev_path);
		return ($return && is_writable($prev_path)) ? mkdir($path) : false;
	}
	static function ResolveArray($array, $field, $key_value, $key = 'id'){
    	foreach ($array as $value) {
    		if($value[$key] == $key_value){
    			return $value[$field];
    		}
    	}
    	return null;
	}
}
?>