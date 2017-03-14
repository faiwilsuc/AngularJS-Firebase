
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];

//$appid = $objData["appdata"];

$app_info1 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetAppIDByFFID?FFID='. $ffid);

$objData = json_decode($app_info1 , true);

$appid = $objData['FFMortAppMap '][0][0];

$app_info = file_get_contents('http://cdeals.co.uk/ffapi/api/Get/GetClinetListByAppidOrFFid?FFID=' . $ffid. '&AppID='. $appid);

echo  "{ \"data\":" .$app_info. "}";
  //$app_info = json_decode($app_info, true);

 
?>
 
    
    
    