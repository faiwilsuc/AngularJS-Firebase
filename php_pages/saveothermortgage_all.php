<?php


error_reporting(0);
require_once('../includes/classothermortage.php');
require_once('../includes/classuser.php');
//to get form for updating fullname in employment tab
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$object=new other_existing_mortage;
$datas=$object->get_alldata($form_id['formid']);
echo json_encode($datas);
?>