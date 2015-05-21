<?php
namespace app\routes;
use RedBean_Facade as R;
function uploadFile($dir, $file, $filename){
    $allowedExts = array("xlsx");
    $temp = explode(".", $file["name"]);
    //var_dump($temp);
    $extension = end($temp);
    $rightType = (($file["type"]== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        || ($file["type"] == "application/vnd.ms-excel"));
    if (!($rightType || (($file["size"]/1024) < 10000) || in_array($extension, $allowedExts))) {
        echo "Invalid file";
        return;
    }
    if ($file["error"]> 0) {
        echo "Return Code: " . $file["error"] . "<br>";
        return;
    }
    if(!is_dir($dir)){
        echo "Created dir.";
        mkdir($dir, 0755, true);
    }
    $saved = $dir.$filename.".".$extension;
    if (file_exists($saved)) {
        rename ($saved, $dir."dump_dev_old.xlsx");
    }
    move_uploaded_file($file["tmp_name"], $saved);
    echo $dir.$filename." !!!<br>";
    echo "<br>Stored in: " .$saved."<br>";
    return $filename.".".$extension;
};


$adminPath = $app->config("admin")["path"];
$app->group($adminPath, function () use ($app) {

    $app->get('/', function() use ($app) {
        $app->view->appendData([
            'viewName'  =>'Панель администратора',
            'title'     => "Добро пожаловать в панель администратора"
        ]);
        $app->render('admin/admin.twig');
    })->name('Admin');

    $app->get('/logout', function() use ($app) {
        $app->contentType('text/html; charset=utf-8');
        $app->response->write("
            <script>
                (function(safeLocation){
                    var outcome, u, m = 'Вы успешно вышли из панели администратора.';
                    // IE has a simple solution for it - API:
                    try { outcome = document.execCommand('ClearAuthenticationCache') }catch(e){}
                    // Other browsers need a larger solution - AJAX call with special user name - 'logout'.
                    if (!outcome) {
                        // Let's create an xmlhttp object
                        outcome = (function(x){
                            if (x) {
                                // the reason we use 'random' value for password is
                                // that browsers cache requests. changing
                                // password effectively behaves like cache-busing.
                                x.open('HEAD', safeLocation || location.href, true, 'logout', (new Date()).getTime().toString())
                                x.send('')
                                // x.abort()
                                return 1 // this is **speculative** 'We are done.'
                            } else {
                                return
                            }
                        })(window.XMLHttpRequest ? new window.XMLHttpRequest() : ( window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : u ))
                    }
                    if (!outcome) {
                        m = 'Your browser is too old or too weird to support log out functionality. Close all windows and restart the browser.'
                    }
                    alert(m)
                    window.location = '/';
                    // return !!outcome
                })(/*if present URI does not return 200 OK for GET, set some other 200 OK location here*/)
            </script>");
    });    

    $app->group("/projects",function () use ($app) {

        $app->group("/edit",function () use ($app) {
            $app->get("/:id", function($id) use ($app){
                $project = [];
                $types = [];
                try {
                    $types = \models\ProjectsData::GetTypes();
                    $project = \models\ProjectsData::GetProject($id);
                    $project["images"] = \models\ProjectsData::GetImages($project["id"]);         
                    if(empty($project)){
                        $app->flash('error', 'Проект не найден');
                        $app->redirect("/admin/projects");
                    }
                } catch (\Exception $e) {
                    $app->log->error($e->getMessage());
                    $app->halt(500);
                }

                $app->view->appendData([
                    'viewName'  => "Редактирование проекта",
                    'title'     => "Редактирование проекта",
                    'projectTypes' => $types,
                    'project' => $project
                ]);

                $app->render('admin/projects/edit.twig');
            });   

            $app->get("/", function() use ($app){
                $types = [];
                try {
                    $types = \models\ProjectsData::GetTypes();
                } catch (\Exception $e) {
                    $app->log->info($e->getMessage());
                }
                $app->view->appendData([
                    'viewName'  => "Создание проекта",
                    'title'     => "Создание проекта",
                    'projectTypes' => $types,
                ]);

                $app->render('admin/projects/edit.twig');
            });  
        });

        $app->get("/", function() use ($app){
            try {
                $projects = \models\ProjectsData::GetProjects();
                $types = \models\ProjectsData::GetTypes();
            } catch (\Exception $e) {
                $projects = [];
                $types = [];
            }
            if(empty($projects)){
                $app->flash('info', 'В базе пока нет ни одного проекта, здесь вы можете создать его');
                $app->redirect("/admin/projects/edit");
            }
            $app->view->appendData([
                'viewName'  => "Проекты",
                'title'     => "Проекты",
                'projects'   => $projects,
                'types' => $types
            ]);
            $app->render('admin/projects/index.twig');
        });

        $app->post("/addpreview", function() use ($app){
            $id = $app->request->post("pk");
            $url = $app->request->post("url");
            $ext = pathinfo($url, PATHINFO_EXTENSION);
            $save_path = '/files/projects/'.$id.'_preview.'.$ext;
            rename($url, $_SERVER['DOCUMENT_ROOT'].$save_path);
            $result = array("url" => $save_path, "message" => null);
            try{
                \models\ProjectsData::UpdatePreview($save_path, $id);
            } catch (\Exception $e){
                $app->halt(500,'Error when saving preview');
            }
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($result));
        });

        $app->post("/addimage", function() use ($app){            
            $id = $app->request->post("pk");
            $url = $app->request->post("url");
            $save_path = '/files/projects/'.$id.'/'.basename($url);
            rename($url, $_SERVER['DOCUMENT_ROOT'].$save_path);
            $result = array("url" => $save_path, "message" => null);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($result));

        });

        $app->post("/save", function() use ($app){
            $project = [
                "id" => $app->request->post("id"),
                "title" => $app->request->post("title"),
                "finished" => \DateTime::createFromFormat(\models\ProjectsData::DATE_FORMAT,$app->request->post("finished"))->format(\models\ProjectsData::DATE_SQL_FORMAT),
                "preview_alt" => $app->request->post("preview_alt"),
                "link" => $app->request->post("link"),
                "type" => $app->request->post("type"),
                "popular" => null !== $app->request->post("popular") ? 1 : 0,
                "interesting" => null !== $app->request->post("interesting") ? 1 : 0,
                "description" => $app->request->post("description")
            ];

            if(empty($project["id"])){
                try{
                    $id = \models\ProjectsData::Add($project);
                    $app->flash('info', 'Проект был успешно создан, теперь можно загрузить фотографии и превью');                    
                } catch (\Exception $e){
                    $app->flash('error', 'Произошла ошибка, проект не был создан');
                    $app->redirect("/admin/projects");
                }
                $app->redirect('/admin/projects/edit/'.$id.'#photoupload');
            } else {
                try{
                    \models\ProjectsData::Update($project);       
                } catch (\Exception $e){
                    $app->flash('error', 'Произошла ошибка, изменения не были сохранены');
                    $app->redirect("/admin/projects");
                }   
                $app->redirect('/admin/projects');      
            }
        });

        $app->get("/delete/:id", function($id) use ($app){   

            if(empty($id)){
                $app->flash('error', 'Нельзя удалить то, чего нет');  
                $app->redirect("/admin/projects");     
            }
            try{
                \models\ProjectsData::Delete($id);
            } catch (\Exception $e){
                $app->flash('error', 'Произошла ошибка, проект не был удален. Причина - '.$e->getMessage());
                $app->redirect("/admin/projects");
            } 
            $app->flash('success', 'Проект был успешно удален');
            $app->redirect("/admin/projects");
        });

    });
    
    $app->group("/files", function () use ($app) {
        $app->post("/uploadimage", function() use ($app){
            $message = "";
            $url = "";
            
            try{
                $url = \models\FilesModel::UploadImage();
            } catch(Exception $e){
                $message = $e->getMessage();
                $app->halt(500,'File upload failed');
            }
            $result = array("url" => $url, "message" => $message);

            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->write(json_encode($result));
        });
        $app->post("/delete", function() use ($app){
            $file = $app->request->post("pk");
            $path = $_SERVER['DOCUMENT_ROOT']."/".$file;
            if(!unlink($path)){
                $app->halt(500,'Deleition failed'); 
            }
        });
    });


    

    // $app->post("/addContent", function() use ($app){
    //     $contentItem = \models\ContentData::GetParams();
    //     $contentItem["title"]               = $app->request->post("title");
    //     $contentItem["html_content"]        = $app->request->post("html_content");
    //     $contentItem["meta_keywords"]       = $app->request->post("meta_keywords");
    //     $contentItem["meta_description"]    = $app->request->post("meta_description");
    //     $contentItem["meta_title"]          = $app->request->post("meta_title");
    //     $contentItem["parent"]              = $app->request->post("parent");
    //     $contentItem["route"]               = $app->request->post("route");
    //     // if( empty($param1) ||
    //     //     empty($param2) ){
    //     //         $app->halt(422);
    //     // };
    //     \models\ContentData::AddContent($contentItem);

    //     $app->redirect('/admin/editContent');
    // });

    // $app->group("/apiContents", function () use ($app) {
    //     $app->get("/", function() use ($app){
    //         $app->response->headers->set('Content-Type', 'application/json;charset=utf-8');
    //         $orders = \models\OrderModel::GetOrders();
    //         $app->response->write(json_encode($orders, JSON_UNESCAPED_UNICODE));
    //     });
    // });
});
