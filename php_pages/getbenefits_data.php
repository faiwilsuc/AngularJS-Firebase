<?php
require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");
$objData = json_decode($data , true);


$applicant_id=$objData['applicantid'];
/*$applicantindex=$objData['applicantindex'];*/

$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$object=new employment_income;
//$get_det=$object->get_benefits_data($objData);
$get_det=$object->get_benefits_data($form_id['formid'],$applicant_id);

if($get_det==null)
{
$array=array("noinfo"=>"nodata");	
echo json_encode($array);	
}
else{
echo json_encode($get_det);
}
?>