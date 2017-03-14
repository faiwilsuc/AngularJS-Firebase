<?php

require_once('../includes/classapplicants.php');
require_once('../includes/classuser.php');

$client_id = 1; 


$object=new applicants;
$user=new user;
$form_id=$user->get_formid($client_id);

$get_det=$object->select_employment($form_id['formid']);
$json_array=array($get_det);
echo json_encode($json_array);


?>
 
    
    
    