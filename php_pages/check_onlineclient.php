<?php
require_once('../includes/classuser.php');

$user=new user;

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$id=$data->clientid;
$online_users=$user->check_availableclient($id);
echo json_encode($online_users);

?>