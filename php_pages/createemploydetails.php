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
$url = 'http://52.16.72.176/ffapi/api/Save/SaveEmployment';
//The JSON data.
$jsonData = array(
    'EmploymentHeaderID' => $objData['EmploymentHeaderID'],
    'EmploymentID' => $objData['EmploymentID'],
    'eEmploymentStatusID' => $objData['eEmploymentStatusID'],
    'StartDate' => $getform_det['startdate'],
    'EndDate' => $getform_det['enddate'],
    'CurrentEmployment' => $getform_det['current_emp'],
    'eOccupationID' => '150'
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