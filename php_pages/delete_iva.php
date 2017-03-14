<?php
require_once('../includes/classcredithistroy.php');
require_once('../includes/classuser.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
$data = file_get_contents("php://input");

$objData = json_decode($data , true);
$object=new credit_histroy;

$get_det=$object->delete_iva($objData['id']);


//echo json_encode($get_det);
?>