<?php

require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');
$client_id = 1;
$user = new user;
//$form_id=$user->get_formid($client_id);
$form_id = '23456745';


$data = file_get_contents("php://input");

$objData = json_decode($data, true);


$session_id = 'gfjbv42dvhshsb1fn81clj7en0';


$employstatus = $objData['employment_status']; //change this name
$startdate = $objData['start_date'];
$enddate = $objData['end_date'];
$cont_emp = $objData['how_continous_employment'];
$current_emp = $objData['is_current_employment'];
$empstatusone = $objData['employment_status'];
$applicant_id = $objData['applicant_id'];
$userid = $objData['userid'];



$object = new employment_income;
$updateddata = $object->employ_header($employstatus, $empstatusone, $cont_emp, $current_emp, $startdate, $enddate, $userid, $form_id, $applicant_id);
$array = array("applicant_id" => $applicant_id, "formid" => $form_id);
echo json_encode($array);
?>