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
$userid = 1;


    $DateStarted = $objData['DateStarted'];
    $IsSatisfactorilyConducted = $objData['IsSatisfactorilyConducted'];
    $DateCompleted = $objData['DateCompleted'];
	$applicantid = $objData['applicantid'];
$applicant_id=$objData['applicant_id'];
$object=new credit_histroy;
$object->insert_nextiva($DateStarted,$IsSatisfactorilyConducted,$DateCompleted,$applicantid,$userid,$form_id['formid'],$applicant_id);


?>