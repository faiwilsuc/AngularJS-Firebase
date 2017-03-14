<?php
require_once('database.php');

class meetings
{
    function insert_info($MortgageApp,$IsExistingClient,$IsCommitmentFeePaid,$eLeadSourceID,$description,$session_id)
    {
        global $database;
        $sql="INSERT INTO meeting_aims(client_id,session_id,select_applicants,existing_client,committment_fee_paid,leadcource,description) VALUES(1,'$session_id','$MortgageApp','$IsExistingClient','$IsCommitmentFeePaid','$eLeadSourceID','$description')";
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

    }



}
?>