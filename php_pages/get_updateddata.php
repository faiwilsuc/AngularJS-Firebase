<?php
require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
$data = file_get_contents("php://input");

$applicant_id=$objData['applicant_id'];
$applicantindex=$objData['index_i'];

$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$object=new employment_income;
//$get_det=$object->get_benefits_data($objData);
$get_det=$object->get_benefits_data($form_id['formid'],$applicant_id,$applicantindex);


echo json_encode($get_det);
?>