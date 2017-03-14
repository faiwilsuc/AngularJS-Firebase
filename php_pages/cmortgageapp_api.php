<?php

 
error_reporting(0);
require_once('../includes/classexistingmortage.php');
require_once('../includes/classmortagereq.php');

$session_id='gfjbv42dvhshsb1fn81clj7en0';
$exist_mortage=new existing_mortage;
$getform_exist=$exist_mortage->get_existingmortagetab();

$mortage=new mortage_req;
$mortage_req=$mortage->get_mortagereqtab();


$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/FFAPI/api/Save/SaveMortAppDetail';
 
//Initiate cURL.
$ch = curl_init($url);
 
//The JSON data.
$jsonData = array(
   'FFID' => $objData['FFID'],
    'MortAppID' => $objData['MortAppID'],
    'AppID' => $objData['Appid'],
    'eMortgageTypeID' => $mortage_req['mortage_type'],
    'eDepositSourceID' => $mortage_req['source_deposit'],
    'PurchasePrice' => $mortage_req['purchase_price'],
    'PropertyValue' => $mortage_req['PropertyValue'],
    'IsLTB' => $getform_exist['IsLTB'],
    'ISFTL' => $getform_exist['ISFTL'],
    'RTBPurchasePriceAfterDiscount' => $mortage_req['purchaseprice_afterdiscount'], 
    'ePaymentMethodID' => $getform_exist['ePaymentMethodID'],
    'LoanRequired' => $mortage_req['loan_required'],
    'CapitalRaising' => $mortage_req['additional_captial'],
    'TermMonths' => $mortage_req['termof_new'],
    'Deposit' => $mortage_req['deposit_amount'],
    'LTV' => $getform_exist['monthly_rental'],
    'MortAmtRequired' => $mortage_req['loan_required'],
    'eBTLMortgagePaymentCoveredID' => $getform_exist['paymnet_covered'],
    'BTLAnticipatedMonthlyIncome' => $getform_exist['monthly_payments']
    
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