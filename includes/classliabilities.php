<?php
require_once('database.php');

class liaiblities
{
function update_info($field,$value,$userid,$session_id)
{
global $database;
$sql = "UPDATE liabilities SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
$query = $database->query($sql);
}

function update_next($liabilitytype,$CreditCardType,$CreditLimit,$MonthlyPayments,$BalanceOutstanding,$Provider,$Consolidate,$overratedraft,$rateofinterest,$start_date,$end_date,$userid,$session_id)
{
global $database;
$sql="UPDATE liabilities SET card_typeid='$CreditCardType',credit_limit='$CreditLimit',monthly_payment='$MonthlyPayments',balance_outstanding='$BalanceOutstanding',liability_type='$liabilitytype',consolidate='$Consolidate',provider='$Provider',overrate_draft='$overratedraft',rateof_interest='$rateofinterest',startdate='$start_date',enddate='$end_date',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
//$database->query($sql);
if($database->query($sql)) 
{
$insert = $database->insert_id();
if($insert)
{
return $insert;
}
} 
}

function insert($name,$liabilitytype,$CreditCardType,$CreditLimit,$MonthlyPayments,$BalanceOutstanding,$Provider,$Consolidate,$overratedraft,$rateofinterest,$start_date,$end_date,$userid,$formid)
{
global $database;
$sql="INSERT INTO liabilities (client_id,applicants_name,card_typeid,credit_limit,monthly_payment,balance_outstanding,liability_type,consolidate,provider,overrate_draft,rateof_interest,startdate,enddate,createddate,form_id) VALUES('$userid','$name','$CreditCardType','$CreditLimit','$MonthlyPayments','$BalanceOutstanding','$liabilitytype','$Consolidate','$Provider','$overratedraft','$rateofinterest','$start_date','$end_date',NOW(),'$formid')";
$database->query($sql);

}


function get_liabilitiestab()
{
global $database;
$sql="SELECT * FROM liabilities";
$result_set = $database->query($sql);
$object_array = array();
while ($row = $database->fetch_assoc($result_set)) 
{
$object_array[] =$row;
}
return $object_array;	
}


}
?>