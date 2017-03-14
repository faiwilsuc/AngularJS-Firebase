<?php

 //$data = '{"AppID":34020,"ClientID":5502}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/ffapi/api/Save/SaveAddress';
 
//Initiate cURL.
$ch = curl_init($url);
 
//The JSON data.
$jsonData = array(
   'FFID' => $objData['FFID'],
    'eAddressTypeID' => '4',
    'PostCode' => $objData['PostCode'],
    'Address1' => $objData['Address1'],
    'Address2' => $objData['Address2'],
    'Address3' => $objData['Address3'],
    'Town' => $objData['Town'],
    'Country' => $objData['Country'],
    'County' => $objData['Country']
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

$results = curl_exec($ch);


//$result ='{"XmlTagName":"Applications","ModifiedBy":null,"ModifiedByForDatabase":0,"AppID":19084811,"FFID":4061,"AddressID":0,"eApplicationTypeID":0,"eAppStatusID":null,"UserDescription":null,"SubmissionNumber":0,"ReVisitDate":null,"IsDefaultApplication":false,"ShortlistedProductID":null,"ShortlistedLenderID":null,"ObjectState":1}1';


//$tt = urldecode(str_replace("\\","",$results));

//$t = substr($tt,0,-1); 

//$result = "{ \"data\":" .$t. "}";

curl_close($ch);



?>

