<?php
require_once('../includes/classmessages.php');
require_once('../includes/classuser.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$user=new user;
$insertid=$user->select_videocallid();
echo json_encode($insertid);
?>