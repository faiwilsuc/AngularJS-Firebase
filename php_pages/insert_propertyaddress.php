<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';

error_reporting(0);
require_once('../includes/classpropertydetails.php');
require_once('../includes/classuser.php');


$session_id='gfjbv42dvhshsb1fn81clj7en0';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);
//print_r($objData);
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);
//The JSON data.

$formid=$form_id['formid'];
$address=$objData['address'];
	

$object=new property_details;

$object->insert_propertyaddress($client_id,$address,$formid);




?>