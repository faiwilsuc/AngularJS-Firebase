<?php
require_once('../includes/classcredithistroy.php');
require_once('../includes/classuser.php');
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);
$formid=$form_id['formid'];

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$object=new credit_histroy;
$result=$object->get_defaultsdatas($formid);
echo json_encode($result);

?>