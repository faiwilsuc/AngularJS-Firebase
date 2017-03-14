<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

//API Url
$url = 'http://52.16.72.176/FFAPI/api/Save/SaveNumOccurences';
 
//Initiate cURL.
$ch = curl_init($url);
 
//The JSON data.
$jsonData = array(
    'FFID' => $objData['FFID'],
    'NumOccID' => $objData['NumOccID'],
    'ArrDefID' => $objData['ArrDefID'],
    'NumOccID' => $objData['NumOccID'],
    'One' => $objData['One'],
    'Two' => $objData['Two'],
    'Three' => $objData['Three'],
    'Four' => $objData['Four'],
    'Five' => $objData['Five'],
    'Six' => $objData['Six'],
    'Seven' => $objData['Seven'],
    'Eight' => $objData['Eight'],
    'Nine' => $objData['Nine'],
    'Ten' => $objData['Ten'],
    'eleven' => $objData['eleven'],
    'Twelve' => $objData['Twelve'],
    'Thirteen' => $objData['Thirteen'],
    'Fourteen' => $objData['Fourteen'],
    'Fifteen' => $objData['Fifteen'],
    'Sixteen' => $objData['Sixteen'],
    'Seventeen' => $objData['Seventeen'],
    'Eighteen' => $objData['Eighteen'],
    'Nineteen' => $objData['Nineteen'],
    'Twenty' => $objData['Twenty'],
    'Twentyone' => $objData['Twentyone'],
    'Twentytwo' => $objData['Twentytwo'],
    'Twentythree' => $objData['Twentythree'],
    'TwentyFour' => $objData['TwentyFour'],
    'TwentyFive' => $objData['TwentyFive'],
    'TwentySix' => $objData['TwentySix'],
    'TwentySeven' => $objData['TwentySeven'],
    'TwentyEight' => $objData['TwentyEight'],
    'TwentyNine' => $objData['TwentyNine'],
    'Thirty' => $objData['Thirty'],
    'ThirtyOne' => $objData['ThirtyOne'],
    'ThirtyTwo' => $objData['ThirtyTwo'],
    'ThirtyThree' => $objData['ThirtyThree'],
    'ThirtyFour' => $objData['ThirtyFour'],
    'ThirtyFive' => $objData['ThirtyFive'],
    'ThirtySix' => $objData['ThirtySix'],
    'ThirtySeven' => $objData['ThirtySeven'],
    'ThirtyEight' => $objData['ThirtyEight'],
    'ThirtyNine' => $objData['ThirtyNine'],
    'Forty' => $objData['Forty'],
    'FortyOne' => $objData['FortyOne'],
    'FortyTwo' => $objData['FortyTwo'],
    'FortyThree' => $objData['FortyThree'],
    'FortyFour' => $objData['FortyFour'],
    'FortyFive' => $objData['FortyFive'],
    'FortySix' => $objData['FortySix'],
    'FortySeven' => $objData['FortySeven'],
    'FortyEight' => $objData['FortyEight'],
    'FortyNine' => $objData['FortyNine'],
    'Fifty' => $objData['Fifty'],
    'Fiftyone' => $objData['Fiftyone'],
    'Fiftytwo' => $objData['Fiftytwo'],
    'Fiftythree' => $objData['Fiftythree'],
    'Fiftyfour' => $objData['Fiftyfour'],
    'Fiftyfive' => $objData['Fiftyfive'],
    'Fiftysix' => $objData['Fiftysix'],
    'Fiftyseven' => $objData['Fiftyseven'],
    'Fiftyeight' => $objData['Fiftyeight'],
    'Fiftynine' => $objData['Fiftynine'],
    'Sixty' => $objData['Sixty'],
    'Sixtyone' => $objData['Sixtyone'],
    'Sixtytwo' => $objData['Sixtytwo'],
    'Sixtythree' => $objData['Sixtythree'],
    'Sixtyfour' => $objData['Sixtyfour'],
    'Sixtyfive' => $objData['Sixtyfive'],
    'Sixtysix' => $objData['Sixtysix'],
    'Sixtyseven' => $objData['Sixtyseven'],
    'Sixtyeight' => $objData['Sixtyeight'],
    'Sixtynine' => $objData['Sixtynine'],
    'Seventy' => $objData['Seventy'],
    'Seventyone' => $objData['Seventyone'],
    'Seventytwo' => $objData['Seventytwo'] 
    
    
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