<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classmonthlyoutgoing.php');
$session_id='gfjbv42dvhshsb1fn81clj7en0';


$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$council=$objData['FFID'];//not change
   $expenditure_id=$objData['ExpenditureID'];//not change
    $council=$objData['council_tax'];
    $telephone=$objData['telephone_internet_bills'];
     $internet=$objData['telephone_internet_bills'];
     $tv=$objData['tv_licence'];
    $cartravels=$objData['car_travel_bills'];
      $foodbills=$objData['food_bills'];
      $utilities=$objData['utilities'];
      $lifeinsu=$objData['life_insurance'];
      $criticalillness=$objData['critical_illness_policies'];
      $penpolicy=$objData['pension_policy']; 
      $homeinsurance=$objData['home_insurance']; 
     $regularsave=$objData['regular_savings']; 
      $maintenancepayment=$objData['maintenance_payments']; 
      $others=$objData['others'];
      $userid=$objData['userid'];//not change
	  

$object=new monthly_outgoing;
$object->update_next($council,$telephone,$internet,$tv,$cartravels,$foodbills,$utilities,$lifeinsu,$criticalillness,$penpolicy,$homeinsurance,$regularsave,$maintenancepayment,$others,$userid,$session_id);


?>