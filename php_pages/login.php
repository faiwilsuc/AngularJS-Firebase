<?php
require_once('../includes/classuser.php');


$data=json_decode(file_get_contents('php://input'));



$emailid=$data->emailid;
$password=$data->password;


$user=new user;
$login=$user->login($emailid,$password);
$data=array("session_id" => $login['user_id'], "role" => $login['role']);
echo json_encode($data);


?>
