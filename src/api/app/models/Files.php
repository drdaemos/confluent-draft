<?php
namespace models;
class Files{
	static function UploadImage($uploaddir = '/uploads/images/'){
		$allowed = array('jpg','png','gif', 'jpeg');
		$filename = $_FILES['upload']['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);
		if(!in_array(strtolower($ext),$allowed)) {
		    throw new \Exception("Вы не можете загрузить файл, не являющийся изображением");    
			return false;
		}	
		return self::UploadFile($uploaddir);	
	}
	static function UploadFile($uploaddir = '/uploads/'){
		$filename = $_FILES['upload']['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);
		$uploadfile = $_SERVER['DOCUMENT_ROOT'].$uploaddir . uniqid() . ".".$ext;

		if (move_uploaded_file($_FILES['upload']['tmp_name'], $uploadfile)) {
			self::ResizeImage($uploadfile);
			//self::Watermark($uploadfile);
			return $uploadfile;
		} else {
			throw new \Exception("Ошибка при загрузке файла");			
			return false;
		}
	}
	static function CreateDirectory($name, $path){		
		\lib\Utils::CreatePath($_SERVER['DOCUMENT_ROOT'].$path."/".$name);
	}

	static function ResizeImage($path){
		\lib\Utils::ResizeAndCompress($path);
	}
	static function Watermark($path){
		\lib\Utils::AddWatermarkIM($path);
	}

	static function getAvatar($user_id, $type = 'large'){
		$path = '/images/avatar/' . $type . '/';
		$avatar = glob($_SERVER['DOCUMENT_ROOT'] . $path . $user_id . '.*');
		if(!empty($avatar)){
            return $path . basename($avatar[0]);
        } else return '/images/no-avatar.png';
	}
}

?>
