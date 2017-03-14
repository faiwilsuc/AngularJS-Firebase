<?php

require_once('../includes/classmortagereq.php');
require_once('../includes/classuser.php');

$client_id = 1; 


$object=new mortage_req;
$user=new user;
$form_id=$user->get_formid($client_id);

//$get_propertyaddress=get_address($form_id['formid']);


$get_det=$object->get_bridingtab($form_id['formid']);
if(isset($get_det))
{
echo json_encode($get_det);	
}
else
{
$array=array("error"=>'nodata');
echo json_encode($array);	
}



?>
 
    
    
    