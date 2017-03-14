<?php

error_reporting(0);
require_once('../includes/classliabilities.php');
require_once('../includes/classuser.php');

$client_id = 1; 
/*$user=new user;
$form_id=$user->get_formid($client_id);*/
//give static values for form as of now

$form_id='23456745';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

  	
    $liabilitytype=$objData[liablility_type];
    $CreditCardType=$objData[card_type];
    $CreditLimit=$objData[credit_limit];
    $MonthlyPayments=$objData[monthly_payment];
    $Provider=$objData[provider];
    $BalanceOutstanding=$objData[balance_outstanding];
    $Consolidate=$objData[consolidate];
	$overratedraft=$objData[overdraft_rate];
	$rateofinterest=$objData[rate_of_interest];
	$start_date=$objData[start_date];
	$end_date=$objData[end_date];
	//$userid=$objData[userid];//not change
	//$name=$objData[applicant_name];//not change
	//$applicantid=$objData[applicant_id];//not change
//static values as of now	
	$userid='1';//not change
	$name='test';//not change
	$applicantid='1';//not change
	
$object=new liaiblities;
$object->insert($name,$liabilitytype,$CreditCardType,$CreditLimit,$MonthlyPayments,$BalanceOutstanding,$Provider,$Consolidate,$overratedraft,$rateofinterest,$start_date,$end_date,$userid,$form_id,$applicantid);



?>