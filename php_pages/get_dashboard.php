<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classselectedproducts.php');
require_once('../includes/classuser.php');


$data = file_get_contents("php://input");

$objData = json_decode($data , true);
 

$ffid=$objData['ffid'];

$object=new products();
$get_data=$object->get_selectedproducts($ffid);
echo json_encode($get_data);
?>