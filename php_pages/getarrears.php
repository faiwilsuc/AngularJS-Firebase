
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];
$Appid = $objData['Appid'];

//$appid = $objData["appdata"];

$app_info1 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetArrears?FFID='.$ffid.'&Appid='.$Appid.'');

//$objData = json_decode($app_info1 , true);

echo  "{ \"data\":" .$app_info1. "}";
  //$app_info = json_decode($app_info, true);
 
?>
 
    
    
    