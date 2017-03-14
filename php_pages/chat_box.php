<?php
require_once('classmessages.php');
require_once('classuser.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$object=new messages;
$user=new user;

$message=$data->message;
$from_id=$data->userid;
$to_id=$data->toid;
$minimize_flag=$object->detect_minize($to_id);

$conversation_id=$data->conversation_id;
//$minimize=$data->minimize;
//print_r($data);
$get_currentchat=$user->get_currentchatid($from_id);

$current_id = $get_currentchat['currentchat_id'];
if($to_id==$current_id && $minimize_flag==1)
{
$read_status=1;
$minimize_flag=1;
$object->insert_messages($message,$from_id,$to_id,$conversation_id,$read_status,$minimize_flag);	
}
else
{
$read_status=0;	
$minimize_flag=0;
$object->insert_messages($message,$from_id,$to_id,$conversation_id,$read_status,$minimize_flag);
}
?>