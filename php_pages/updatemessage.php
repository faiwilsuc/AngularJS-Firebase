<?php
require_once('classmessages.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

$editid=$data->editedid;
$message=$data->message;
$object=new messages;
$edit_msg=$object->update_message($message,$editid);
echo json_encode($edit_msg);
?>