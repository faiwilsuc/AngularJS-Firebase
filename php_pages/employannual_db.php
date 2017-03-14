<?php

require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');

$client_id = 1; 
$user=new user;
//$form_id=$user->get_formid($client_id);
$form_id='23456745';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);



$annual = $objData['a_basic_salary'];
$irregular = $objData['irregular_commission'];
$garunteedovertime = $objData['a_guaranteed_ot'];
$garunteedbonus = $objData['a_regular_bonus'];
$regular_bonustime =$objData['a_regular_bonus'];
$ren_living = $objData['living_allowance'];
//$gross_annual = $objData['GrossAnnualIncome'];
$total_monthly = $objData['net_monthly_income'];
$applicant_id=$objData['applicant_id'];//posted from json itself 


$userid = $objData['userid'];



$object=new employment_income;
$object->employ_annual($annual,$irregular,$garunteedovertime,$garunteedbonus,$regular_bonustime,$ren_living,$total_monthly,$userid,$form_id,$applicant_id);

?>