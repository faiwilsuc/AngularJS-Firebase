<?php
error_reporting(0);
require_once('../includes/classcredithistroy.php');
require_once('../includes/classuser.php');
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);



 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';


$data = file_get_contents("php://input");

$objData = json_decode($data , true);
$session_id='gfjbv42dvhshsb1fn81clj7en0';
	$applicantid = $objData['applicantid'];
    $amount = $objData['Amount'];
    $incurreddate = $objData['ArrDefDate'];
    $datesatisfied = $objData['DateSatisfied'];
	$userid = 1;
	$applicant_id=$objData['applicant_id'];
$object=new credit_histroy;
$object->insert_nextdefaults($amount,$incurreddate,$datesatisfied,$applicantid,$userid,$form_id['formid'],$applicant_id);


?>