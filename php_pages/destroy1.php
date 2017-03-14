<?php
require_once('../includes/classuser.php');


$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$client_id = 1; 

$userid=$data->id;

$user=new user;
$form_id=$user->get_formid($client_id);
$user->delete($userid,$form_id['formid']);

?>