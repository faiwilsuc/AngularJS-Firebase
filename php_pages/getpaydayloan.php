<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classpaydayloans.php');
require_once('../includes/classuser.php');

$session_id='gfjbv42dvhshsb1fn81clj7en0';

$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

  	
   
$object=new paydayloans;
$insertedid=$object->get_paydayloansdetails($client_id,$form_id['formid']);

echo json_encode($insertedid);


?>