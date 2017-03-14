<?php

require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');

$data = file_get_contents("php://input");
$objData = json_decode($data, true);
$client_id = 1;
$user = new user;
//$form_id=$user->get_formid($client_id);
$form_id = '23456745';

$pension = $objData['pension'];
$bed_room = $objData['bedroom_rental'];
$investments = $objData['investments'];
$other = $objData['other'];
$secondjob = $objData['second_job'];
$applicant_id = $objData['applicant_id'];
$additional = $objData['additional_income'];
$userid = 1;



$object = new employment_income;
$object->employ_additional($pension, $bed_room, $investments, $other, $secondjob, $userid, $form_id, $applicant_id, $additional);
?>