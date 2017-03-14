<?php
require_once('database.php');

class monthly_outgoing
{
function update_info($field,$value,$userid,$session_id)
{
global $database;
$sql = "UPDATE monthly_outgoing SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
$query = $database->query($sql);
}

function update_next($council,$telephone,$internet,$tv,$cartravels,$foodbills,$utilities,$lifeinsu,$criticalillness,$penpolicy,$homeinsurance,$regularsave,$maintenancepayment,$others,$userid,$session_id)
{
global $database;
$sql="UPDATE monthly_outgoing SET council_tax='$council',telephone_bills='$telephone',internet_bills='$internet',tv_license='$tv',car_travels_bills='$cartravels',food_bills='$foodbills',utilities='$utilities',lifeinsurance='$lifeinsu',critical_illnesspolicies='$criticalillness',pension_policies='$penpolicy',home_insurance='$homeinsurance',regular_savings='$regularsave',maintenance_payments='$maintenancepayment',others='$others',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
$database->query($sql); 
}

function get_monthlyoutgoingtab()
{
global $database;
$userid=1;
$session_id='gfjbv42dvhshsb1fn81clj7en0';
$sql="SELECT * FROM monthly_outgoing WHERE client_id=".$userid." AND session_id='".$session_id."'";
$result_set = $database->query($sql);
$row = $database->fetch_assoc($result_set);
return $row;	
}


}
?>