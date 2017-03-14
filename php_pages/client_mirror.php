<?php
require_once('../includes/classuser.php');



$object=new user;
$clientid=$object->client_mirror();


echo json_encode($clientid);
?>