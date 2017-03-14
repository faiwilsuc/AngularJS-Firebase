<?php

require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);



$userid = $objData['userid'];
$year =  $objData['year'];
$accounts =  $objData['eAccountsAvailableID'];
$netprofit1oss1 = $objData['NetProfitOrLoss1'];
//$netprofit1oss = $objData['NetProfitOrLoss'];
//$netprofitloss2 = $objData['NetProfitOrLoss2'];
//$netprofitloss12= $objData['NetProfitOrLoss12'];
//$eaccounts = $objData['eAccountsAvailableID'];
$totalmonthly_income = $objData['TotalNetMonthlyIncomes'];
$applicant_id=$objData['applicant_id'];
$object=new employment_income;
$object->employ_selfemployment($year,$accounts,$netprofit1oss1,$totalmonthly_income,$userid,$form_id['formid'],$applicant_id);

?>