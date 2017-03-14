
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];
$appid = $objData['Appid'];

 

$app_info2 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetMortAppDetails_ByAppID?FFID='.$ffid.'&AppID='.$appid.'&IsDefaultApplication=true');
    
    $string1 = substr($app_info2 , 1, -1);
    
    $app_info3 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetCurrentMortgages?AppID='.$appid.'&FFID='.$ffid.'&IsDefaultApplication=true');
    
     $string2 = substr($app_info3 , 1, -1);

    if($app_info3 == "null")
    { 
        $res =   "{".$string1."}"; 
    }
    else{     
        $res =   "{".$string1.",".$string2."}";
    }

 echo  "{ \"data\":[" .$res. "]}";
  //$app_info = json_decode($app_info, true); 
 
?>
 
    
    
    