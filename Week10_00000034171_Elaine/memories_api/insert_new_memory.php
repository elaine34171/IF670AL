<?php
    if(isset($_SERVER['HTTP_ORIGIN'])){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    }
  
    $response = array();
  
    if(!empty($_POST['title']) && !empty($_POST['type']) && !empty($_POST['markerLat']) && !empty($_POST['markerLng']) && isset($_FILES['photo'])){
        if(isset($_POST['id'])){
            $id = $_POST['id'];
        }
        else{
            $id = rand();
        }

        $title = $_POST['title'];
        $type = $_POST['type'];
        $markerLat = $_POST['markerLat'];
        $markerLng = $_POST['markerLng'];
        
        $photo = $_FILES['photo'];

        require_once __DIR__ . '/dbconfig.php';
  
        $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());
  
        $source = $photo['tmp_name'];
        $destination = 'uploads/' . $photo['name'];
        move_uploaded_file($source, $destination);
  
        $result = mysqli_query($db, "INSERT INTO memories VALUES('$id', '$destination', '$title', '$type', '$markerLat', '$markerLng')");

        if($result){
            $response['success'] = 1;
            $response['message'] = "Data added successfully";
        }
        else{
            $response['success'] = 0;
            $response['message'] = "Something went wrong";
        }
    
        echo json_encode($response);
    }
    else{
        $response['success'] = 0;
        $response['message'] = "Input is missing";
        
        echo json_encode($response);
    }
?>