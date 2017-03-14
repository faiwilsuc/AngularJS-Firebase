<?php
require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$object=new employment_income;

$get_det=$object->all_benefits();



echo json_encode($get_det);
?>