<?php
require_once('database.php');

class mortage_req
{
    function update_info($field,$value,$userid,$session_id)
    {
        global $database;
        $sql = "UPDATE mor_req SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($applicantype,$mortagetype_id,$paymentcoverd,$AMRI,$deposit_source,$propertyvalue,$yrs,$deposit,$paymentid,$mortagepaymentid,$captial,$purchaseafterdiscount,$purchaseprice,$userid,$session_id)
    {
        global $database;
        $sql="UPDATE mor_req SET application_type='$applicantype',mortage_type='$mortagetype_id',buy2letpayment='$paymentcoverd',Anticipated_MRI='$AMRI',source_deposit='$deposit_source',property_value='$propertyvalue',termof_new='$yrs',deposit_amount='$deposit',method_repayment='$mortagepaymentid',
additional_captial='$captial',purchase_price='$purchaseprice',purchaseprice_afterdiscount='$purchaseafterdiscount',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
        $database->query($sql);
    }

    function get_mortagereqtab()
    {
        global $database;
        $userid=1;
        $session_id='gfjbv42dvhshsb1fn81clj7en0';
        $sql="SELECT * FROM mor_req WHERE client_id=".$userid." AND session_id='".$session_id."'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }


}
?>