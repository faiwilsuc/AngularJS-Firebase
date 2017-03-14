<?php
require_once('classmessages.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$deleteid=$data->deleteid;

$object=new messages;
$object->delete_message($deleteid);

?>