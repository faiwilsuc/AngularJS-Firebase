<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classexistingmortage.php');
$data = file_get_contents("php://input");

$object=new existing_mortage;
$getform_det=$object->get_existingmortagetab();


$objData = json_decode($data , true);
  //API Url
$url = 'http://52.16.72.176/FFAPI/api/Save/SaveCurrentMortgages';

//The JSON data.
$jsonData = array(
   'FFID' => $objData['FFID'],
    'MortgageID' => $objData['MortgageID'],
    'Appid' => $objData['Appid'],
    'eLenderID' => $getform_det['lenders_m'],
    'eMortgageTypeID' => $getform_det['mortage_type'], 
    'ERCPaymentMode' => '1',
    'eMortgagePaymentMethodID' => $getform_det['paymnet_covered'],
    'OriginalBalance' => $getform_det['original_mortageamount'],
    'RemainingBalance' => $getform_det['outstanding_balance'],
    'MonthlyPayments' => $getform_det['monthly_payments'],
    'ToBeRepaid' => 'true'
    
    
);
// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($jsonData)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo $result;

?>
