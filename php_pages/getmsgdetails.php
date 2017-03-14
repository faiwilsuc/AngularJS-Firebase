<?php
require_once('classmessages.php');


$post_date = file_get_contents("php://input");
$data = json_decode($post_date);


$conversation = $data->conversation; 
$rconversation = $data->rconversation; 



$object=new messages;
$view_all=$object->get_allmsgs($conversation,$rconversation);


echo json_encode($view_all);



?>