<?php

require_once('../includes/classpropertydetails.php');
require_once('../includes/classuser.php');

$client_id = 1; 


$object=new property_details;
$user=new user;
$form_id=$user->get_formid($client_id);

//$get_propertyaddress=get_address($form_id['formid']);


$get_det=$object->get_propertydetailsdata($form_id['formid']);

echo json_encode($get_det);	



?>
 
    
    
    