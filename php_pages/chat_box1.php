<?php
require_once('../includes/classmessages.php');
require_once('../includes/classuser.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$object=new messages;
$user=new user;

$message=$data->message;
$from_id=$data->userid;
$to_id=$data->toid;
$conversation_id=$data->conversation_id;

$get_currentchat=$user->get_currentchatid($from_id);

$current_id = $get_currentchat['currentchat_id'];
if($to_id==$current_id)
{
$read_status=1;
$object->insert_messages($message,$from_id,$to_id,$conversation_id,$read_status);	
}
else
{
$read_status=0;	
$object->insert_messages($message,$from_id,$to_id,$conversation_id,$read_status);
}
?>