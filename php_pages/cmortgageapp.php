<?php

 
error_reporting(0);
require_once('../includes/classexistingmortage.php');
require_once('../includes/classuser.php');

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//print_r($objData);


$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);


 
  	$mortagetype=$objData[mortgage_type];
    $propertyvalue=$objData[property_value];
	$purchasedate=$objData[purchase_date];
   	$isltb=$objData[ltb];
    $isftl=$objData[ftl];
	$lenderid=$objData[existing_lender];
	$original=$objData[origional_mortgage_amt];
	$remaining=$objData[outstand_balance];
	$monthly=$objData[monthly_payment];
	$methodofrepayment=$objData[method_repayment];
    $methodofpayment = $objData[repayment_method];
    $loanreq=$objData[LoanRequired];//not change
    $capital=$objData[capital_rasing];
    $termofnew=$objData[term_mortgage_month];
 	$applicantype=$objData[applicant_type];//not change
    $paymentcovered=$objData[payment_covered];
    $monthlyrentalincome=$objData[monthly_rental_income];//not change
 
 	$userid=1; 

$object=new existing_mortage;
if($capital=='')
{
$capital='0';	
$object->insert_data($purchasedate,$applicantype,$mortagetype,$propertyvalue,$isltb,$isftl,$lenderid,$original,$remaining,$monthly,$methodofrepayment,$methodofpayment,$loanreq,$capital,$termofnew,$paymentcovered,$monthlyrentalincome,$client_id,$form_id['formid']);
}
else
{	
$object->insert_data($purchasedate,$applicantype,$mortagetype,$propertyvalue,$isltb,$isftl,$lenderid,$original,$remaining,$monthly,$methodofrepayment,$methodofpayment,$loanreq,$capital,$termofnew,$paymentcovered,$monthlyrentalincome,$client_id,$form_id['formid']);	
}

?>