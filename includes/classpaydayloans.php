<?php
require_once('database.php');

class paydayloans
{
    function update_info($field,$value,$userid,$session_id)
    {
        global $database;
        $sql = "UPDATE paydayloans SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($paydayloan12months,$paydayrepaid,$userid,$session_id,$formid)
    {
        global $database;
        $sql="UPDATE paydayloans SET Payday12Months='$paydayloan12months',PaydayRepaid='$paydayrepaid',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
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

    function insert($paydayloan12months,$paydayrepaid,$userid,$formid)
    {
        global $database;
        $sql="INSERT INTO paydayloans(client_id,Payday12Months,PaydayRepaid,createddate,formid) VALUES('$userid','$paydayloan12months','$paydayrepaid',NOW(),'$formid')";
        $database->query($sql);

    }


    function get_paydayloanstab()
    {
        global $database;
        $sql="SELECT * FROM paydayloans";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set))
        {
            $object_array[] =$row;
        }
        return $object_array;
    }


    function get_paydayloanstab_new($id)
    {
        global $database;
        $sql="SELECT * FROM paydayloans WHERE formid='$id'";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set))
        {
            $object_array[] =$row;
        }
        return $object_array;
    }



    function get_paydayloansdetails($userid,$formid)
    {
        global $database;
        $sql="SELECT * FROM paydayloans WHERE client_id='$userid' AND formid='$formid'";
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