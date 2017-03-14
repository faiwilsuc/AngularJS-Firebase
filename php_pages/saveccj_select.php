<?php
require_once('../includes/classcredithistroy.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$object=new credit_histroy;
$result=$object->get_ccj($objData['name']);
echo json_encode($result);

?>