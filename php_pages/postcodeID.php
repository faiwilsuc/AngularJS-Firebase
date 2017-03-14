
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

 $id = str_replace(' ', '', $objData["data"]);

 

$app_info = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetFullAddressByID?postcodeID=' . $id);

echo  "{ \"data\":[" .$app_info. "]}";
  //$app_info = json_decode($app_info, true);

 
?>
 
    
    
    