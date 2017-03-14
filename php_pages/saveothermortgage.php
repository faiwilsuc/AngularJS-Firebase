<?php


error_reporting(0);
require_once('../includes/classothermortage.php');
require_once('../includes/classuser.php');

$data = file_get_contents("php://input");

$objData = json_decode($data , true);
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$applicant_name=$objData[applicant_name];//not change
$lenderid=$objData[lenders];
$currentrepayment=$objData[repayment_type];
$mortagetype=$objData[mortgage_type];
$outstandingmortage=$objData[outstanding_mortgage];
$rental_income=$objData[rental_incomee];
$userid=1;
$applicantid=$objData[applicant_id];//not change



$object=new other_existing_mortage;
$object->insert_data($lenderid,$currentrepayment,$mortagetype,$outstandingmortage,$userid,$session_id,$applicant_name,$rental_income,$form_id['formid'],$applicantid);

?>