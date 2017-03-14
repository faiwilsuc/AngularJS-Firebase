
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];

//$appid = $objData["appdata"];

$app_info1 = file_get_contents('http://52.16.72.176/ffapi/api/Get/GetLatestPropertyByFFID?FFID='.$ffid.'');

$app_info2 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetExtraCommonLenderQn?FFID='.$ffid.'');

if($app_info2 == "null") {
$string1 = '"XmlTagName1":"null"';
}
else{
$string1 = substr($app_info2 , 1, -1);
}



$objData = json_decode($app_info1 , true);

$AddressID = $objData['Property '][0][0];

//$test = "".$appid."";

if($AddressID > 0) {

$app_info3 = file_get_contents('http://52.16.72.176/FFAPI/api/Get/GetProperties?AddressID='.$AddressID.'');
    
    $string2 = substr($app_info3 , 1, -1);
   
} 
else{
    
    $app_info3  = "null";

}
 

if($app_info3 == "null")
    { 
        $res =   ""; 
    }
    else{  
        
        $res =   "{".$string1.",".$string2."}";
    }



  echo  "{ \"data\":[" .$res. "]}";

  //$app_info = json_decode($app_info, true);

 
?>   
 
    
    
    
 
    
    
    