<?php

error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/ffapi/api/Save/SaveFactFind';

$jsonData = array(
    'UserID' => $objData['UserID'],
    'eCaseStatusID' => $objData['eCaseStatusID'],
    'ModifiedBy' => $objData['ModifiedBy']
);
// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($jsonData)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);


 echo $result;


?>