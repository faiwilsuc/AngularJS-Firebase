<?php
require_once('database.php');

class property_details
{
    function update_info($field,$value,$userid,$session_id)
    {
        global $database;
        $sql = "UPDATE property_details SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($ptype,$pstatus,$tenture,$by,$ctype,$nooflease_years,$page,$noof_kitchen,$noof_bedroom,$roof_construction,$wall_construction,$family_let,$student_let,$multiple_occupancy,$captial_raising,$reason_forcaptial,$userid,$session_id)
    {
        global $database;
        echo $sql="UPDATE property_details SET property_type='$ptype',property_status='$pstatus',tenture='$tenture',built_year='$by',construction_type='$ctype',nooflease_years='$nooflease_years',exlocal_authority='Yes',property_age='$page',roofconstruction_type='$roof_construction',wallconstruction_type='$wall_construction',agriculture_tie='Yes',self_build='Yes',noof_kitchen='$noof_kitchen',noof_bedroom='$noof_bedroom',no_architect='Yes',semi_commercial='Yes'
,family_let='$family_let',student_let='$student_let',multiple_occupancy='$multiple_occupancy',captial_raising='$captial_raising',reason_forcaptial='$reason_forcaptial',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
        $database->query($sql);
    }

    function insert_data($ptype,$pstatus,$tenture,$by,$ctype,$nooflease_years,$page,$noof_kitchen,$noof_bedroom,$roof_construction,$wall_construction,$family_let,$student_let,$multiple_occupancy,$captial_raising,$reason_forcaptial,$userid,$session_id)
    {
        global $database;
        echo $sql="INSERT INTO property_details VALUES property_type='$ptype',property_status='$pstatus',tenture='$tenture',built_year='$by',construction_type='$ctype',nooflease_years='$nooflease_years',exlocal_authority='Yes',property_age='$page',roofconstruction_type='$roof_construction',wallconstruction_type='$wall_construction',agriculture_tie='Yes',self_build='Yes',noof_kitchen='$noof_kitchen',noof_bedroom='$noof_bedroom',no_architect='Yes',semi_commercial='Yes'
,family_let='$family_let',student_let='$student_let',multiple_occupancy='$multiple_occupancy',captial_raising='$captial_raising',reason_forcaptial='$reason_forcaptial',createddate=NOW()";
        $database->query($sql);
    }



    function get_property_detailstab()
    {
        global $database;
        $userid=1;
        $session_id='gfjbv42dvhshsb1fn81clj7en0';
        $sql="SELECT * FROM property_details WHERE client_id=".$userid." AND session_id='".$session_id."'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }


}
?>