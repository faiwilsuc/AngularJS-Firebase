<?php  
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
require_once('../includes/classapplicants.php');
require_once('../includes/classuser.php');

$object=new applicants;
$data = file_get_contents("php://input");

$objData = json_decode($data , true);
//id = $objData['data'];

$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$get_det=$object->get_applicants($client_id,$form_id['formid']);
$FF_id = $objData['data'];

//API Url
$url = 'http://52.16.72.176/ffapi/api/Save/SaveClients';

$jsonData = array(
   'FFID' => $FF_id, 
    'Firstname' => $get_det['forename'],
    'Surname' => $get_det['surname'],
    'Middlenames' => $get_det['middlename'],
    'ElectoralRoll' => $get_det['voters_roll'],
    'DOB' => $get_det['dateofbirth'],
    'eTitleID' => $get_det['forename'],
    'eMaritalStatusID' => $get_det['marital_staus'],
    'eNationalityID' => $get_det['nationality'],
    'eGenderID' => $get_det['gender'],
    'eProofResDurationID' => $get_det['residency'] 
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
 
    
    
    