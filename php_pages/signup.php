<?php
require_once('../includes/classuser.php');

$user=new user;


$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

//print_r($data);

$emailid=$data->emailid;
$password=$data->password;
$cpassword=$data->cpassword;
$telephone_number=$data->telephone_number;
$mobile_number=$data->mobile_number;


$insert=$user->signup($emailid,$password,$cpassword,$telephone_number,$mobile_number);



?>
