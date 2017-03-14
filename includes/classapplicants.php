<?php
require_once('database.php');

class applicants
{
function insert_info($title,$forename,$middlename,$surname,$gender,$nationality,$residency,$marital_status,$voters_roll,$dateofbirth,$userid,$session_id,$ffid,$index)
{
global $database;
$sql="INSERT INTO applicants(client_id,session_id,title,forename,middlename,surname,voters_roll,dateofbirth,gender,marital_staus,nationality,residency,ffid,index_i) VALUES(1,'$session_id','$title','$forename','$middlename','$surname','$voters_roll','$dateofbirth','$gender','$marital_status','$nationality','$residency','$ffid','$index')";
if($database->query($sql)) 
{
$insert = $database->insert_id();
if($insert)
{
return $insert;
}
}
}

function get_details($userid,$session_id)
{
global $database;
$sql="SELECT * FROM applicants WHERE client_id=".$userid." AND session_id='".$session_id."'";
$result_set = $database->query($sql);
$row = $database->fetch_assoc($result_set);
return $row;	
}


function insert_session($title)
{
global $database;
session_start();
$session_id=session_id();
echo $sql="INSERT INTO applicants(client_id,session_id) VALUES('$title','$session_id')";
if($database->query($sql)) 
{
$insert = $database->insert_id();
if($insert)
{
return 1;
}
}
}

function update_info($field,$value,$userid,$session_id)
{
global $database;
$sql = "UPDATE applicants SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
$query = $database->query($sql);
}

function update_next($applicantname,$title,$forename,$middlename,$surname,$gender,$nationality,$residency,$marital_status,$voters_roll,$dateofbirth,$userid,$session_id,$index,$formid)
{
global $database;
$sql="UPDATE applicants SET client_id='$userid',title='$title',forename='$forename',middlename='$middlename',surname='$surname',voters_roll=$voters_roll,dateofbirth='$dateofbirth',gender='$gender',marital_staus='$marital_status',nationality='$nationality',residency='$residency',session_id='$session_id',createddate=NOW() WHERE index_i='$index' AND client_id=$userid";
$database->query($sql);

self::insert_employment($index,$formid,$forename,$userid); 
}

function insert_employment($index,$formid,$forename,$userid)
{
global $database;
$sql="SELECT * FROM employment_income WHERE form_id=$formid AND applicant_id=$index";
$result_set = $database->query($sql);
//self::insert_liability($index,$formid,$forename,$userid); 

$row = $database->fetch_assoc($result_set);
if($index == $row['applicant_id'] && $formid== $row['form_id'])
{
$sql="UPDATE employment_income SET applicant_id='$index',form_id='$formid',fullname='$forename' WHERE form_id='$formid' AND applicant_id='$index'";
$database->query($sql);	
}
else
{
$sql="INSERT INTO employment_income(client_id,applicant_id,form_id,fullname) VALUES(1,'$index','$formid','$forename')";
$database->query($sql);
}
}

function select_employment($formid)
{
global $database;
$sql="SELECT * FROM employment_income WHERE form_id=$formid";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}

function insert_liability($index,$formid,$forename,$userid)
{
global $database;
$sql="SELECT * FROM liabilities WHERE form_id=$formid AND applicant_id=$index";
$result_set = $database->query($sql);
$row = $database->fetch_assoc($result_set);
if($index == $row['applicant_id'] && $formid== $row['form_id'])
{
$sql="UPDATE liabilities SET applicant_id='$index',form_id='$formid',fullname='$forename' WHERE form_id='$formid' AND applicant_id='$index'";
$database->query($sql);	
}
else
{
$sql="INSERT INTO liabilities(client_id,applicant_id,form_id,applicants_name) VALUES(1,'$index','$formid','$forename')";
$database->query($sql);
}
}


function get_applicantstab()
{
global $database;
$userid=1;
$session_id='gfjbv42dvhshsb1fn81clj7en0';
$sql="SELECT * FROM applicants WHERE client_id=".$userid." AND session_id='".$session_id."'";
$result_set = $database->query($sql);
$row = $database->fetch_assoc($result_set);
return $row;	
}

function get_applicants($id,$form)
{
global $database;
$sql="SELECT * FROM applicants WHERE session_id LIKE '$id' AND formid='$form'";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}

function get_applicantindex($id)
{
global $database;
$userid=1;
$session_id='gfjbv42dvhshsb1fn81clj7en0';
$sql="SELECT * FROM applicants WHERE index_i=$id";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array =$row;

}
return $object_array;	
}


}
?>