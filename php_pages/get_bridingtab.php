<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';

error_reporting(0);
require_once('../includes/classmortagereq.php');
require_once('../includes/classuser.php');

$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$data = file_get_contents("php://input");
$objData = json_decode($data , true);

$object=new mortage_req;
$get_bridgedetails=$object->get_bridingtab($form_id['formid']);

if($get_bridgedetails==false)
{
$array=array("error"=>"no data");	
echo json_encode($array);
}
else
{
echo json_encode($get_bridgedetails);	
}

?>