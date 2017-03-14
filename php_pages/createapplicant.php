<?php


error_reporting(0);
require_once('../includes/classapplicants.php');
require_once('../includes/classuser.php');
//to get form for updating fullname in employment tab
$client_id = 1; 
$user=new user;
//$form_id=$user->get_formid($client_id);
$form_id='23456745';

session_start();
$session_id=session_id();   
$_SESSION['session_id']=$session_id;
//if(isset($_SESSION['formid_applicant']))
//{
//$formid = $_SESSION['formid_applicant']; 	
//}
$object=new applicants;

$data = file_get_contents("php://input");

$objData = json_decode($data , true);
	$applicantname = $objData[title];//not change
  $title = $objData[title];
  $marital_status = $objData[marital_status];
   $gender = $objData[gender];
   $nationality = $objData[nationality];
  $residency  = $objData[residency_proof];
  $dateofbirth = $objData[dob];
  $forename = $objData[forename];
   $middlename = $objData[middlename];
   $surname = $objData[surname];
   $voters_roll = $objData[voters_roll]; 
   $mobilenumber=$objData[mobile_number];
   $emailaddress=$objData[email_address];
  // $ffid =  $objData[FFID];//not change
   //$index = $objData[id];//not change
   $index = 1;
   $userid = 1;//not change
   
$object=new applicants;
//$insert=$object->insert_info($title,$forename,$middlename,$surname,$gender,$nationality,$residency,$marital_status,$voters_roll,$dateofbirth,$userid,$session_id,$ffid,$index);


$update=$object->update_next($applicantname,$title,$forename,$middlename,$surname,$gender,$nationality,$residency,$marital_status,$voters_roll,$dateofbirth,$userid,$session_id,$index,$form_id,$mobilenumber,$emailaddress);

//$array=array("client_id"=>$userid,"session_id"=>$_SESSION['session_id'],"form_id"=>$_SESSION['formid_applicant']);
//echo json_encode($array);
?>