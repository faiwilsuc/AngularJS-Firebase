<?php
require_once('../includes/classuser.php');

$user=new user;

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$id=$data->consultantid;
$online_users=$user->online_statusconsultant($id);
echo json_encode($online_users);

?>