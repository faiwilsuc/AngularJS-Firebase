<?php
require_once('../includes/classuser.php');


$user=new user;

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);


$online_client=$user->onlineconsultant();


$online_users=$user->check_availableconsultant();

echo json_encode($online_users);


?>