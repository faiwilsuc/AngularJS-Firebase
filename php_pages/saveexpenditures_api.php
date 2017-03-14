<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);
require_once('../includes/classmonthlyoutgoing.php');
$session_id='gfjbv42dvhshsb1fn81clj7en0';

$object=new monthly_outgoing;
$objData=$object->get_monthlyoutgoingtab();

$data = file_get_contents("php://input");

$ffid = json_decode($data , true);


//API Url
$url = 'http://52.16.72.176/FFAPI/api/Save/saveExpenditure';

//The JSON data.
$jsonData = array(
   'FFID' => $ffid['FFID'],
    'ExpenditureID' => $objData['id'],
    'CouncilTax' => $objData['council_tax'],
    'TelephoneBills' => $objData['telephone_bills'],
    'InternetBills' => $objData['internet_bills'],
    'TVLicence' => $objData['tv_license'],
    'CarBills' => $objData['car_travels_bills'],
    'FoodBills' => $objData['food_bills'],
    'Utilities' => $objData['utilities'],
    'LifeInsurance' => $objData['lifeinsurance'],
    'CriticalIllnessPolicies' => $objData['critical_illnesspolicies'],
    'Pension' => $objData['pension_policies'], 
    'HomeInsurance' => $objData['home_insurance'], 
    'RegularSavings' => $objData['regular_savings'], 
    'MaintenancePayments' => $objData['maintenance_payments'], 
    'Other' => $objData['others']
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