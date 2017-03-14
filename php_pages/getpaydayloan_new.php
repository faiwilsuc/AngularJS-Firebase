<?php

require_once('../includes/classpaydayloans.php');
require_once('../includes/classuser.php');

$client_id = 1; 


$object=new paydayloans;
$user=new user;
$form_id=$user->get_formid($client_id);

$get_det=$object->get_paydayloanstab_new($form_id['formid']);

//if($get_det==''){
//$arr=array("error"=>1);
//echo json_encode($arr);
//}
//else
//{
echo json_encode($get_det);	
//}

?>
 
    
    
    