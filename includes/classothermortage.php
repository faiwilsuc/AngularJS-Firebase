<?php
require_once('database.php');

class other_existing_mortage
{
    function update_info($field,$value,$userid,$session_id)
    {
        global $database;
        $sql = "UPDATE other_existing_mortage SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($lenderid,$currentrepayment,$mortagetype,$outstandingmortage,$userid,$session_id)
    {
        global $database;
        echo $sql="UPDATE other_existing_mortage SET outstanding_mortage='$outstandingmortage',mortage_type='$mortagetype',lenders='$lenderid',current_repayment='$currentrepayment',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
        $database->query($sql);
    }

    function get_otherexistingmortagetab()
    {
        global $database;
        $userid=1;
        $session_id='gfjbv42dvhshsb1fn81clj7en0';
        $sql="SELECT * FROM other_existing_mortage WHERE client_id=".$userid." AND session_id='".$session_id."'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }


    function insert_data($lenderid,$currentrepayment,$mortagetype,$outstandingmortage,$userid,$session_id,$name,$formid)
    {
        global $database;
        echo $sql="INSERT INTO other_existing_mortage(outstanding_mortage,mortage_type,lenders,current_repayment,createddate,client_id,applicant_name,form_id) VALUES('$outstandingmortage','$mortagetype','$lenderid','$currentrepayment',NOW(),'$userid','$name','$formid')";
        $database->query($sql);
    }

    function get_alldata()
    {
        global $database;
        $sql="SELECT * FROM other_existing_mortage";
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