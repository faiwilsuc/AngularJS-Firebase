
<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!

$data = file_get_contents("php://input");

$objData = json_decode($data , true);

$ffid = $objData['FFID'];
$Appid = $objData['Appid'];

//$appid = $objData["appdata"];

$app_info1 = file_get_contents('http://52.16.72.176/ffAPI/api/Get/GetDefaults?FFID='.$ffid.'&Appid='.$Appid.'');

//$objData = json_decode($app_info1 , true);

$app_info2 = '{
	"PassedProducts": [
		["Earl Shilton BS", "638 - 5 Year Stepped Discount - 75% LTV - £399 Fee - Purchase", "Disc", "5 Years", "3.99%", "5.19%", "1044.5", "1181.91", "13448", "0", "914", "2% for 36 Months", "24/12/2018", "36", "£100", "£399", "£0", "£515", "£0", "", "Max Term: 40 years\r\nMin Term: 5 years\r\nMin Age: 18\r\nMax Age: 80\r\nIn Employment Probation Period: No\r\nGuarantors: Consider\r\nExpatriates: No\r\nAccepted Repayment methods: Repayment, Capital Rest: Daily\r\n", "Income Multiples:\r\n4.5 + 1 or 3.5 (upto 80% LTV)\r\n4 + 1 or 3 (upto 100% LTV)\r\n\r\nOther Income:\r\nGuaranteed 100%\r\nGuaranteed Overtime 25%\r\nRegular Bonus 25%\r\nGuaranteed Bonus 25%\r\n", "Level 0\r\nRepossession Not Accepted\r\nPrevious Bankruptcy Not Accepted\r\n", "20%", "Not Applicable", 196561, 233, "Passed"]]}';
 

echo  "{ \"data\":" .$app_info1. "}";
  //$app_info = json_decode($app_info, true);
 
?>
 
    
    
    