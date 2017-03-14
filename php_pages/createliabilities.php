<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classliabilities.php');

$object=new liaiblities;
$getform_det=$object->get_liabilitiestab();



$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/FFAPI/api/Save/SaveLiabilities';
 
//Initiate cURL.
$ch = curl_init($url);
 
//The JSON data.
$jsonData = array(
   'FFID' => $objData['FFID'],
    'LiabilityID' => '1',
    'BalanceOutstanding' => $getform_det['balance_outstanding'],
    'MonthlyPayments' => $getform_det['monthly_payment'],
    'Consolidate' => $$getform_det['consolidate'],    
    'eLiabilityTypeID' => $$getform_det['liability_type'],
    'OverdraftIntRate' => $$getform_det['overrate_draft'],
    'Provider' => $$getform_det['provider'],
    'Rate' => $$getform_det['rateof_interest'],
    'EndDate' => $$getform_det['enddate'],
    'StartDate' => $$getform_det['startdate'],
    'CreditLimit' => $$getform_det['credit_limit'],
    'eCreditCardTypeID' => $$getform_det['card_typeid'] 
);
//Encode the array into JSON.
$jsonDataEncoded = json_encode($jsonData);

 
//Tell cURL that we want to send a POST request.
curl_setopt($ch, CURLOPT_POST, 1);
 
//Attach our encoded JSON string to the POST fields.
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
 
//Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
 
//Execute the request
$result = curl_exec($ch);


?>