<?php
require_once('database.php');

class existing_mortage
{
    function update_info($field, $value, $userid, $session_id)
    {
        global $database;
        $sql = "UPDATE existing_mortage SET " . $field . " = '" . $value . "' WHERE session_id='" . $session_id . "' AND client_id=$userid";
        $query = $database->query($sql);
    }

    function update_next($mortagetype, $propertyvalue, $isltb, $isftl, $lenderid, $original, $remaining, $monthly, $methodofrepayment, $methodofpayment, $loanreq, $capital, $termofnew, $paymentcovered, $monthlyrentalincome, $userid, $session_id)
    {
        global $database;
        $sql = "UPDATE existing_mortage SET lenders_m='$lenderid',original_mortageamount='$original',outstanding_balance='$remaining',monthly_payments='$monthly',method_payment='$methodofpayment',mortage_type='',property_value='$propertyvalue',termof_newmortage='$termofnew',
additional_captialraising='$capital',loan_required='$loanreq',LTB='$isltb',FTL='$isftl',paymnet_covered='$paymentcovered',monthly_rental='$monthlyrentalincome',createddate=NOW() WHERE session_id='" . $session_id . "' AND client_id=$userid";
        $database->query($sql);
    }

    function get_existingmortagetab()
    {
        global $database;
        $userid = 1;
        $session_id = 'gfjbv42dvhshsb1fn81clj7en0';
        $sql = "SELECT * FROM existing_mortage WHERE client_id=" . $userid . " AND session_id='" . $session_id . "'";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function insert_data($purchasedate, $applicantype, $mortagetype, $propertyvalue, $isltb, $isftl, $lenderid, $original, $remaining, $monthly, $methodofrepayment, $methodofpayment, $loanreq, $capital, $termofnew, $paymentcovered, $monthlyrentalincome, $client_id, $form_id){
        global $database;

        $sql = "INSERT INTO existing_mortage (client_id, form_id, applicant_type, mortage_type, purchase_date,original_mortageamount,monthly_payments,method_repayment ,method_payment, property_value, termof_newmortage, load_required, payment_covered, createddate )
                                    VALUES ($client_id, $form_id, $applicantype, $mortagetype, $purchasedate,$original,$monthly,$methodofrepayment, $methodofpayment,$propertyvalue,$termofnew, $loanreq,$paymentcovered, NOW())";


        $database->query($sql);
    }
}
?>