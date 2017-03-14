<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/ffapi/api/Save/SaveApplications';

$jsonData = array(
    'FFID' => $objData['FFID']
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

