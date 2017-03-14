<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';

error_reporting(0);
require_once('../includes/classpropertydetails.php');


$session_id='gfjbv42dvhshsb1fn81clj7en0';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$object=new property_details;

$get_propertydetails=$object->get_property_detailstab();


echo json_encode($get_propertydetails);

?>