<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classmortagereq.php');
$data = file_get_contents("php://input");

$objData = json_decode($data , true);
  	$mortagetype_id=$objData[mortgage_type];
    $month=$objData[new_mortgage_month];
    $paymentcoverd=$objData[payment_covered];
    $AMRI=$objData[monthly_rental];//not change
    $deposit_source=$objData[source_of_deposit];
    $propertyvalue=$objData[property_value];
    $yrs=$objData[new_mortgage_yr];
    $deposit=$objData[deposit_amt];
    $paymentid=$objData[method_repayment];//not change
    $captial=$objData[additional_capital_rasing];
    $mortagepaymentid=$objData[repayment_method];//not change
	$purchaseafterdiscount=$objData[purchase_discount];
	$purchaseprice=$objData[purchase_price];
	$applicantype=$objData[type];//not change
	$userid =1; 
$session_id='gfjbv42dvhshsb1fn81clj7en0';
$object=new mortage_req;
$object->update_next($applicantype,$mortagetype_id,$paymentcoverd,$AMRI,$deposit_source,$propertyvalue,$yrs,$deposit,$paymentid,$mortagepaymentid,$captial,$purchaseafterdiscount,$purchaseprice,$userid,$session_id);

?>
