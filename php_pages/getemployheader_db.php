<?php
require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');


$data = file_get_contents("php://input");

$objData = json_decode($data , true);




$appid = $objData['applicant_id'];
$formid = $objData['formid'];



$object=new employment_income;
$array=$object->get_employheadersdetails($appid,$formid);

echo json_encode($array);
?>