<?php
require_once('../includes/classmeetings.php');
error_reporting(0);

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

session_start();
$session_id=session_id();   
$_SESSION['session_id']=$session_id;

    $eLeadSourceID =$objData['eLeadSourceID'];
    $MortgageApp = $objData['MortgageApp'];
    $HomeInsuranceApp = $objData['HomeInsuranceApp'];
    $LifeApp = $objData['LifeApp'];
    $SeriousIllnessApp = $objData['SeriousIllnessApp'];
    $IncomeProtectionApp = $objData['IncomeProtectionApp'];
    $UnemploymentApp = $objData['UnemploymentApp'];
    $IsCommitmentFeePaid = $objData['IsCommitmentFeePaid'];
    $description = $objData['MeetingAimsDescription'];
    $IsExistingClient = $objData['ContactExistingLender'];
	
$object=new meetings;	
$insert=$object->insert_info($MortgageApp,$IsExistingClient,$IsCommitmentFeePaid,$eLeadSourceID,$description,$session_id);
$array=array('meetingid'=>$insert);
echo json_encode($array);

?>

