<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//$FF_id = $objData['FFID'];

//API Url
$url = 'http://cdeals.co.uk/ffapi/api/Save/SaveSelfEmployed';
 
//Initiate cURL.
$ch = curl_init($url);
 
//The JSON data.
$jsonData = array(
   'EmploymentID' => $objData['EmploymentID'],
    'NetProfitOrLoss' => $objData['NetProfitOrLoss'],
    'IncomeSelfEmpDetailID' => $objData['IncomeSelfEmpDetailID'] 
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



//$result = '{"XmlTagName":"FactFinds","ModifiedBy":0,"ModifiedByForDatabase":0,"FFID":4061,"UserID":null,"StaffID":null,"eCaseStatusID":null,"ProcessingStatusID":null,"Modified_By":0,"ObjectState":1}1';


//$tt = urldecode(str_replace("\\","",$result));

 //echo $t = substr($tt,0,-1);

//"{ \"data\":" .$t. "}";


curl_close($ch);


?>