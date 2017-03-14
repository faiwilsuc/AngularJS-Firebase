<?php
require_once('../includes/classmessages.php');
require_once('../includes/classuser.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$conversation_id=$data->conversation;

$object=new messages;
$view_all=$object->getcount($conversation_id);

echo json_encode($view_all);



?>