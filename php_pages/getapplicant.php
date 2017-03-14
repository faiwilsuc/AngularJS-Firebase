
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
require_once('../includes/classapplicants.php');
$object=new applicants;
//$data = file_get_contents("php://input");
//
//$objData = json_decode($data , true);
//
//$id = $objData['data'];
//
//
//
//$get_det=$object->get_applicants($id);


$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$id = $objData["data"];

//API Url
$url = 'http://52.16.72.176/FFAPI/api/Get/GetClientDetails';

$jsonData = array(
    'FF_id' => $objData["data"],
);
// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'GET',
        'content' => http_build_query($jsonData)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);


echo  "{ \"data\":" .$result. "}";
?>
 
    
    
    