<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classliabilities.php');
require_once('../includes/classuser.php');
//to get form for updating fullname in employment tab
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);


$session_id='gfjbv42dvhshsb1fn81clj7en0';



$data = file_get_contents("php://input");

$objData = json_decode($data , true);

  	
//    $liabilitytype=$objData[eLiabilityTypeID];
   
$object=new liaiblities;
$insertedid=$object->get_liabilitiestab($form_id['formid']);

//$dt=array("applicants_name"=>'adsf');

echo json_encode($insertedid);


?>