<?php
require_once('database.php');

class employment_income
{
    function update_info($field,$value,$userid,$session_id)
    {
        global $database;
        $sql = "UPDATE employment_income SET ".$field." = '".$value."' WHERE session_id='".$session_id."' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($employment_statusone,$start_date,$occupation,$cont_emp,$end_date,$acc_qualify,$curr_emp,$annualbasic_sal,$irregular,$annual_gaurenteebonus,$annual_garunteeovertime,$regular_bonusover,$rental_living,$gross_annualincome,$total_monthly,$additional,$benefit_any,$bedroom_rental,$investments,$other,$second_job,$benefit,$amount,$userid,$session_id)
    {
        global $database;
        $sql="UPDATE employment_income SET key_worker='Yes',employment_statusr='Full',employment_statusone='$employment_statusone',startdate='$start_date',occupation='$occupation',cont_employment='$cont_emp',enddate='$end_date',account_qualify='$acc_qualify',current_emp='Yes',annualbasic_salary='$annualbasic_sal',irregular_commision='$irregular',annual_garunteedbonus='$annual_gaurenteebonus',annual_garunteedovertime='$annual_garunteeovertime',regular_bonusovertime='$regular_bonusover',rental_livingallowance='$rental_living',gross_annualincome='$gross_annualincome',total_monthlyincome='$total_monthly',additional_income='$additional',any_benefits='$benefit_any',pension='$pension',bedroom_rental='$bedroom_rental',
,investments='$investments',other='$other',second_job='$second_job',benefit='',amount='',createddate=NOW() WHERE session_id='".$session_id."' AND client_id=$userid";
        $database->query($sql);
    }

    function employ_header($employstatus,$empstatusone,$cont_emp,$current_emp,$startdate,$enddate,$userid,$form_id,$applicant_id)
    {
        global $database;
        $sql="UPDATE employment_income SET employment_statusr='$employstatus',employment_statusone='$empstatusone',current_emp='$current_emp',cont_employment='$cont_emp',startdate='$startdate',enddate='$enddate',Employment='true',createddate=NOW() WHERE form_id='$form_id' AND applicant_id='$applicant_id'";
        $result_set=$database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function employ_annual($annual,$irregular,$garunteedovertime,$garunteedbonus,$regular_bonustime,$ren_living,$total_monthly,$userid,$form_id,$applicant_id)
    {
        global $database;
        $sql="UPDATE employment_income SET annualbasic_salary='$annual',irregular_commision='$irregular',annual_garunteedbonus='$garunteedbonus',annual_garunteedovertime='$garunteedovertime',regular_bonusovertime='$regular_bonustime',rental_livingallowance='$ren_living',total_monthlyincome='$total_monthly',Income_Employed='true',createddate=NOW() WHERE form_id='$form_id' AND applicant_id='$applicant_id'";
        $database->query($sql);
    }

    function employ_additional($pension,$bed_room,$investments,$other,$secondjob,$userid,$form_id,$applicant_id,$additional)
    {
        global $database;
        $sql="UPDATE employment_income SET pension='$pension',bedroom_rental='$bed_room',investments='$investments',other='$other',second_job='$secondjob',additional_income='$additional',createddate=NOW() WHERE form_id='$form_id' AND applicant_id='$applicant_id'";
        $database->query($sql);

    }



    function employ_benefits($benefits,$amount,$form_id,$applicant_id,$benefits_radio)
    {
        global $database;
        $sql="UPDATE employment_income SET benefit='$benefits',amount='$amount',any_benefits='$benefits_radio',createddate=NOW() WHERE form_id='$form_id' AND applicant_id='$applicant_id'";
        $database->query($sql);
    }

    function employ_selfemployment($year,$accounts,$netprofit1,$netprofit1oss,$netprofitloss1,$netprofitloss2,$netprofitloss12,$totalmonthly_income,$userid,$form_id,$applicant_id)
    {
        global $database;
        $sql="UPDATE employment_income SET year='$year',account_qualify='$accounts',NetProfitOrLoss1='$netprofitloss1',NetProfitOrLoss='$netprofit1oss',NetProfitOrLoss2='$netprofitloss2',NetProfitOrLoss12='$netprofitloss12',TotalNetMonthlyIncomes='',Self_Income='true',createddate=NOW() WHERE form_id='$form_id' AND applicant_id='$applicant_id'";
        $database->query($sql);
    }


    function get_employmentincometab()
    {
        global $database;
        $userid=1;
        $session_id='gfjbv42dvhshsb1fn81clj7en0';
        $sql="SELECT * FROM employment_income WHERE client_id=".$userid." AND session_id='".$session_id."'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function get_employheadersdetails($app_id,$form_id)
    {
        global $database;
        $sql="SELECT * FROM employment_income WHERE applicant_id='$app_id' AND form_id='$form_id'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function update_employment($index,$userid)
    {
        global $database;
        $sql="UPDATE employment_income(client_id,applicant_id,form_id,fullname) VALUES(1,'$index','$formid','$forename')";
        $database->query($sql);
    }


    function benefits_addeddata($app_id,$form_id)
    {
        global $database;
        $sql="SELECT * FROM employment_income";
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