<?php
require_once('classmessages.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);




$editid=$data->editid;

$object=new messages;
$edit_msg=$object->edit_message($editid);
echo json_encode($edit_msg);
?>