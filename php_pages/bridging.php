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


$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

  	$IsBridgingMainResidence=$objData[IsBridgingMainResidence];
    $BridgingTermMonths=$objData[BridgingTermMonths];
    $RolledUpInterest=$objData[RolledUpInterest];
    $PayEndofTerm=$objData[PayEndofTerm];
    $AnotherAddress=$objData[AnotherAddress];
    $AnotherValue=$objData[AnotherValue];
    $AnotherOutstanding=$objData[AnotherOutstanding];
    $AnotherLender=$objData[AnotherLender];
    $BridgingEquity=$objData[BridgingEquity];
    $CapitalRaising=$objData[CapitalRaising];
   
	
$object=new mortage_req;
$object->insert_briding($IsBridgingMainResidence,$BridgingTermMonths,$RolledUpInterest,$PayEndofTerm,$AnotherAddress,$AnotherValue,$AnotherOutstanding,$AnotherLender,$BridgingEquity,$form_id['formid']);

?>
