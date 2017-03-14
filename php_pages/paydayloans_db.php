<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classpaydayloans.php');
require_once('../includes/classuser.php');

/*$session_id='gfjbv42dvhshsb1fn81clj7en0';*/
$client_id = 1; 
//form id as static as of now
$form_id ='2341233';
//$user=new user;
//$form_id=$user->get_formid($client_id);


$data = file_get_contents("php://input");

$objData = json_decode($data , true);

  	
    $Payday12Months=$objData['last12_months'];
    $PaydayRepaid=$objData['repaid_on_time'];
  
	
$object=new paydayloans;
$object->update_next($Payday12Months,$PaydayRepaid,$client_id,$form_id);



?>