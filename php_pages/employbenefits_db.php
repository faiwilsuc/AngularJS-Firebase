
<?php

require_once('../includes/classempincome.php');
require_once('../includes/classuser.php');
$client_id = 1; 
$user=new user;
//$form_id=$user->get_formid($client_id);
$form_id='23456745';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);


$benefits_radio = $objData['benefits'];


$benefits = $objData['benifit'];
$amount = $objData['beniifit_amt'];
$applicant_id=$objData['applicantid'];//didnot change
/*$applicant_index=$objData['applicantindex'];*/


$object=new employment_income;
$object->employ_benefits($benefits,$amount,$form_id,$applicant_id,$benefits_radio);



?>