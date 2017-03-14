<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';

error_reporting(0);
require_once('../includes/classexistingmortage.php');
require_once('../includes/classuser.php');
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);


$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$object=new existing_mortage;

$get_mortagedetails=$object->get_existingmortagetab($form_id['formid']);


if($get_mortagedetails==false)
{
$array=array("error"=>"no data");	
echo json_encode($array);
}
else
{
echo json_encode($get_mortagedetails);	
}



?>