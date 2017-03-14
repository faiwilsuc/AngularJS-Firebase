<?php
require_once('../includes/classcredithistroy.php');
require_once('../includes/classuser.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$objData = json_decode($data , true);
$session_id='gfjbv42dvhshsb1fn81clj7en0';

    //'FFID' => $objData['FFID'],
	$applicantid = $objData['applicant_id'];
    $amount=$objData['ccj_amt'];
  	$judgementdate = $objData['ccj_register_date'];
    $satisfied = $objData['satisfied_date'];
    $datesatisfied = $objData['satisfied_date'];
	$applicant_id=$objData['applicant_id'];
	$userid = 1;
$object=new credit_histroy;
$object->insert_nextccj($amount,$judgementdate,$satisfied,$datesatisfied,$userid,$applicantid,$form_id['formid'],$applicant_id);


?>