
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];

//$appid = $objData["appdata"];

$app_info1 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetAppIDByFFID?FFID='. $ffid);

$objData = json_decode($app_info1 , true);

$appid = $objData['FFMortAppMap '][0][0];

echo  "{ \"Appid\":" .$appid. "}";
  //$app_info = json_decode($app_info, true);

 
?>
 
    
    
    