<?php

require_once('../includes/classempincome.php');

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
$session_id='gfjbv42dvhshsb1fn81clj7en0';

print_r($data);


$employment_statusone=$data->employment_statusone;
$start_date=$data->startdate;
$occupation=$data->occupation;
$cont_emp=$data->cont_employment;
$end_date=$data->enddate;
$acc_qualify=$data->account_qualify;
$curr_emp=$data->current_emp;
$annualbasic_sal=$data->annualbasic_salary;
$irregular=$data->irregular_commision;
$annual_gaurenteebonus=$data->annual_garunteedbonus;
$annual_garunteeovertime=$data->annual_garunteedovertime;
$regular_bonusover=$data->regular_bonusovertime;
$rental_living=$data->rental_livingallowance;
$gross_annualincome = $data->gross_annualincome;
$total_monthly = $data->total_monthlyincome;

$benefit_any = $data->anybenefit;
$additional = $data->anyadditional;
$bedroom_rental='';
$investments='';
$other='';
$second_job='';
$benefit='';

$userid=$data->userid;


$object=new employment_income;
//$object->update_next($employment_statusone,$start_date,$occupation,$cont_emp,$end_date,$acc_qualify,$curr_emp,$annualbasic_sal,$irregular,$annual_gaurenteebonus,$annual_garunteeovertime,$regular_bonusover,$rental_living,$gross_annualincome,$total_monthly,$bedroom_rental
//,$investments,$other,$second_job,$benefit,$amount,$userid,$session_id);

$object->update_next($employment_statusone,$start_date,$occupation,$cont_emp,$end_date,$acc_qualify,$curr_emp,$annualbasic_sal,$irregular,$annual_gaurenteebonus,$annual_garunteeovertime,$regular_bonusover,$rental_living,$gross_annualincome,$total_monthly,
$additional,$benefit_any,$bedroom_rental,$investments,$other,$second_job,$benefit,$amount,$userid,$session_id);



?>