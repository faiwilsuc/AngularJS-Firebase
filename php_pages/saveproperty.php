<?php

 //$data = '{"MeetingAimsID":368,"FFID":425,"MeetingAimsDescription":"tested-balu2"}';

error_reporting(0);
require_once('../includes/classpropertydetails.php');
require_once('../includes/classuser.php');


$session_id='gfjbv42dvhshsb1fn81clj7en0';

$data = file_get_contents("php://input");

$objData = json_decode($data , true);
//print_r($objData);
$client_id = 1; 
$user=new user;
$form_id=$user->get_formid($client_id);
//The JSON data.

$formid=$form_id['formid'];
	$property_address=$objData[prop_addres];
   $ptype= $objData[ePropertyTypeID];
    $pstatus=$objData[ePropertyStatusID]; 
    $residencytype= $objData[ePropertyResidenceID];  
   $yearbuiltin= $objData[YearBuiltIn];
   $lift= $objData[Lift];
   $studioflat=$objData[StudioFlat];
    $converted= $objData[Converted];
   $balconyaccess= $objData[BalconyAccess];
  $floor=$objData[Floor];
  $purposebuilt=$objData[PurposeBuilt];
  $numfloors=$objData[NumFloors];
   $tenture= $objData[eTenureTypeID];
   $nooflease_years=$objData[LeaseYearsRemaining];
  $constructiontypeid=$objData[eConstructionTypeID]; 
  $ageyears=$objData[AgeYears]; 
  $agemonths=$objData[AgeMonths]; 
  $exlocal_authority=$objData[ExLocalAuthority]; 
    $wall_construction=$objData[eWallConstructionID];
    $roof_construction= $objData[eRoofConstructionID];
   $selfbuild=$objData[SelfBuild];
    $agriculturaltie=$objData[AgriculturalTie];
  $noof_bedroom= $objData[NumBedrooms];
   $noof_kitchen= $objData[NumKitchens];
   $semicommercial=$objData[SemiCommercial];
$architect=$objData[ArchitectCertificate];
  $family_let=$objData[IsFamilyLet]; 
   $student_let= $objData[IsStudentLet];
    $multiple_occupancy=$objData[IsHMO]; 
    $captial_raising=$objData[IsCapitalRaisingAllowed];
	  $reason_forcaptial=$objData[CapitalRaisingReason];
	  $semicommercialpercentage=$objData[SemicommericalPercentage];
	

$object=new property_details;

$object->update_next($client_id,$property_address,$ptype,$pstatus,$residencytype,$yearbuiltin,$lift,$studioflat,$converted,$balconyaccess,$floor,$purposebuilt,$numfloors,$tenture,$constructiontypeid,$nooflease_years,$exlocal_authority,$ageyears,$noof_kitchen,$noof_bedroom,$semicommercial,$architect,$semicommercialpercentage,$roof_construction,$wall_construction,$agriculturaltie,$selfbuild,$family_let,$student_let,$multiple_occupancy,$captial_raising,$reason_forcaptial,$formid);




?>