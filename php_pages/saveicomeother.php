<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classempincome.php');

$object=new employment_income;
$getform_det=$object->get_employmentincometab();

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//$FF_id = $objData['FFID'];

//API Url
$url = 'http://52.16.72.176/ffapi/api/Save/SaveIncomeOther';
 
//The JSON data.
$jsonData = array(
   'EmploymentHeaderID' => $getform_det['id'],
    'OtherIncomeID' => '2',
    'Pension' => $getform_det['pension'],
    'BedroomRental' => $getform_det['bedroom_rental'],
    'Investments' =>$getform_det['investments'],
    'Other' => $getform_det['other'], 
    'SecondJob' => $getform_det['second_job']
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