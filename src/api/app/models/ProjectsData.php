<?php
namespace models;

class ProjectsData{

	const DATE_FORMAT = "m.Y";
	const DATE_SQL_FORMAT = 'Y-m-d';

	static function GetProjects($qty = null){
		$query = \ORM::for_table("projects")->order_by_expr("strftime('%s', finished) DESC, id DESC");
		if(!empty($qty)){			
			$query->limit($qty);
		}
		$projects = $query->find_array();
		return $projects;
	}

	static function GetByTag($tag, $qty = null){
		$query = \ORM::for_table("projects")->where($tag, 1)->order_by_expr("strftime('%s', finished) DESC, id DESC");
		if(!empty($qty)){			
			$query->limit($qty);
		}
		$projects = $query->find_array();
		return $projects;
	}

	static function GetProject($id){
		$project = \ORM::for_table("projects")->find_one($id);
		if(empty($project)){
			return null;
		} else {
			return $project->as_array();
		}
	}
	static function GetByType($type, $qty = null) {
		$type_obj = \ORM::for_table("project_types")->where('link', $type)->find_one();		
		$query = \ORM::for_table("projects")->where('type', $type_obj->id)->order_by_expr("strftime('%s', finished) DESC, id DESC");
		if(!empty($qty)){			
			$query->limit($qty);
		}
		$projects = $query->find_array();
		return $projects;
	}

	static function GetByYear($year, $qty = null) {
		$query = \ORM::for_table("projects")->where_like("finished", "$year%")->order_by_expr("strftime('%s', finished) DESC, id DESC");
		if(!empty($qty)){			
			$query->limit($qty);
		}
		$projects = $query->find_array();
		return $projects;
	}

	static function UpdatePreview($path, $id){
		$project = \ORM::for_table("projects")->find_one($id);

		if(empty($project)){
			throw new \Exception("Проект не найден");
		} else {
			$project->preview = $path;
			$project->save();
		}
	}

	static function GetImages($id){		
		$result = array();
		$int_path = "/files/projects/".$id."/";
		$img_path = $_SERVER['DOCUMENT_ROOT']."/".$int_path;
		$glob = glob($img_path."*");
		if(is_array($glob)){
			foreach ($glob as $image) {
				$result[] = array("path" => $int_path.basename($image));
			}
		}
		return $result;
	}

	static function GetTypes(){
		$types = \ORM::for_table("project_types")->find_array();
		return $types;
	}
	static function GetYears(){
		$projects = self::GetProjects();
		$years = array();
		foreach ($projects as $project) {
			$finished = new \DateTime($project["finished"]);
			$years[] = $finished->format("Y");
		}
		$years = array_values(array_unique($years));
		sort($years);
		return array_reverse($years);
	}

	static function Add($project){
		foreach ($project as $key => $value) {
			if(empty($value)){
				unset($project[$key]);
			}
		}
		$db_item = \ORM::for_table("projects")->create();
		$db_item->set($project);
		$db_item->save();
		\models\FilesModel::CreateDirectory($db_item->id(), "/files/projects");
		return $db_item->id();
	}

	static function Update($project){
		$db_item = \ORM::for_table("projects")->find_one($project["id"]);

		if(!empty($db_item)){
			$db_item->set($project);
			$db_item->save();
		} else {
			throw new \Exception("Проект не найден");
		}
	}

	static function Delete($id){
		$db_item = \ORM::for_table("projects")->find_one($id);
		if(!empty($db_item)){
			$db_item->delete();
		} else {
			throw new \Exception("Проект не найден");
		}
	}
}