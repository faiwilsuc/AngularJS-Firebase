<?php
require_once('database.php');

class messages
{
function insert_messages($message,$from_id,$to_id,$conversation_id,$readmsg,$minimize_flag)
{
global $database;
$sql="INSERT INTO message(from_ad,to_ad,message,conversation_id,read_msg,flag,date) VALUES($from_id,$to_id,'$message','$conversation_id',$readmsg,$minimize_flag,NOW())";
if($database->query($sql)) 
{
$insert = $database->insert_id();
return true;
}
}

function get_details($id)
{
global $database;
$sql="SELECT * FROM message WHERE from_ad=$id";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}

function get_allmsgs($conversation,$rconversation)
{
global $database;
$sql="SELECT * FROM message WHERE conversation_id='$conversation' OR conversation_id='$rconversation'";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}

function update_ureadmsg($id)
{
global $database;
$sql="UPDATE message SET flag=1,read_msg=1 WHERE conversation_id='$id'";
$result_set = $database->query($sql);
}

function detect_minize($id)
{
global $database;	
$sql="SELECT * FROM message WHERE from_ad=$id AND flag=1";
$result_set = $database->query($sql);
$count = $database->num_rows($result_set);
return $count; 
}

function getc_details($id)
{
global $database;
$sql="SELECT * FROM message WHERE to_ad=$id";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}

function client_mirror($id)
{
global $database;
$sql="SELECT * FROM message WHERE to_ad=$id";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}

function getcount($id)
{
global $database;
$sql="SELECT COUNT(*) AS unread FROM message WHERE conversation_id='$id' AND flag=0";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}

function count_update($id)
{
global $database;
$sql="UPDATE message SET read_msg=0 WHERE conversation_id='$id'";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}


function edit_message($id)
{
global $database;
$sql="SELECT * FROM message WHERE id='$id'";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}

function update_message($msg,$id)
{
global $database;
$sql="UPDATE  message SET message='".$msg."' WHERE id=$id";
$result_set = $database->query($sql);
}


function message_count()
{
global $database;
$sql="SELECT count(*) as count FROM message";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}

function delete_message($id)
{
global $database;
$sql="DELETE FROM message WHERE id=$id";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}


function get_unreadmsg($id)
{
global $database;
$sql="SELECT * FROM message WHERE conversation_id='$id'";
$result_set = $database->query($sql);
$res=$database->fetch_assoc($result_set);
return $res;
}



}
?>