<?php
require_once('database.php');
require_once('class.phpmailer.php');
require_once('PHPMailerAutoload.php');

class user
{

    function signup($emailid, $password, $cpassword, $telephone_number, $mobile_number)
    {
        global $database;
        $sql = "SELECT * FROM users WHERE emailid='$emailid'";
        $result = $database->query($sql);
        $count = $database->num_rows($result);
        if ($count == 1) {
            $status = "failure";
            echo $status;
        } else {
            if ($password == $cpassword) {
                $sql = "INSERT INTO users(emailid,password,telephone_number,mobile_number,role,status,created_date) VALUES('$emailid','$password','$telephone_number','$mobile_number',2,1,NOW())";
                if ($database->query($sql)) {
                    $insert = $database->insert_id();
                    if ($insert) {
                        return 1;
                    }
                }
            } else {
                return false;
            }
        }
    }

    function login($emailid, $password)
    {
        global $database;
        $sql = "SELECT * FROM users WHERE emailid='$emailid' AND password='$password'";
        $result_set = $database->query($sql);
        $count = $database->num_rows($result_set);
        $row = $database->fetch_assoc($result_set);
        if ($count > 0) {
            session_start();
            $_SESSION['user_id'] = $row['client_id'];
            $_SESSION['role'] = $row['role'];
            $_SESSION['username'] = $row['client_name'];
            $_SESSION['sessionid'] = session_id();
            $_SESSION['last_activity'] = time();
            $check_sql = "UPDATE users SET logged_in =1,session_id='" . $_SESSION['sessionid'] . "' WHERE client_id=" . $row['client_id'] . "";
            $make_check = $database->query($check_sql);
            $logged_in = 1;
            self::add_access($_SESSION['user_id'], $_SESSION['username'], $_SESSION['role'], $_SESSION['sessionid'], $_SESSION['last_activity'], $logged_in);
            if ($_SESSION['role'] == 2) {
                self::update_next($_SESSION['user_id']);
            }
            return $_SESSION;
        }


    }

    function add_access($user_id, $username, $role, $sessionid, $time, $logged_in)
    {
        global $database;
        $sql = "INSERT INTO online_clients(user_id,user_name,session_id,time,logged_in,role) values(" . $user_id . ",'" . $username . "','" . $sessionid . "','" . $time . "'," . $logged_in . "," . $role . ")";
        $query = $database->query($sql);

    }

    function update_access($user_id, $username, $role, $sessionid, $time, $logged_in)
    {
        global $database;
        $sql = "UPDATE online_clients set session_id = '" . $sessionid . "', time='" . $time . "',logged_in=" . $logged_in . ",role=" . $role . ",user_name='" . $username . "' WHERE user_id=" . $user_id . "";
        $query = $database->query($sql);

    }

    function destroy_session($user_id)
    {
        global $database;
        $sql = "UPDATE users set session_id='null',logged_in =0 WHERE client_id=" . $user_id;
        $destroy = $database->query($sql);
    }

    function delete($user_id)
    {
        global $database;
        $sql = "delete from online_clients where user_id=" . $user_id;
        $destroy = $database->query($sql);
        self::destroy_session($user_id);
        //self::delete_formiddata($formid);
    }

    function delete_formiddata($formid)
    {
        global $database;
        $sql = "delete from employment_income where form_id=$formid";
        $database->query($sql);
    }

    function update_currentchatid($currentchatid, $userid)
    {
        global $database;
        $sql = "UPDATE online_clients set currentchat_id=$currentchatid WHERE user_id=" . $userid;
        $destroy = $database->query($sql);
    }

    function get_currentchatid($userid)
    {
        global $database;
        $sql = "SELECT * FROM online_clients  WHERE user_id=" . $userid;
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function get_formid($userid)
    {
        global $database;
        $sql = "SELECT formid FROM online_clients  WHERE user_id=" . $userid;
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;
    }

    function logout()
    {
        session_start();
        if (isset($_SESSION['user_id'])) {
            $user_id = $_SESSION['user_id'];
            self::delete($user_id);

            unset($_SESSION['user_id']);
            session_destroy();
        }

    }

    function change_password($oldpassword, $newpassword, $userid)
    {
        global $database;
        $sql = "UPDATE users SET password='$newpassword' WHERE client_id=$userid";
//$database->escape_value($this->id);
        echo $sql1 = "select * from users WHERE client_id=$userid";
        $result = mysql_query($sql1);
        $re = mysql_fetch_row($result);
        $senddate = date("l dS \of F Y h:i:s A");
        $header = "Content-Type:text/html;charset=iso-8859-1\r\n";
        $header .= "From:Contact Form Submission \r\n";
        $body = '
			
			
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>www.aggrim.com</title>
</head>
<body>
<table width="803" border="0" align="center" cellpadding="0" cellspacing="0" style="background:#f2f2f2">
<tr>
    <td height="82" valign="top" style="padding:0 10px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
         <td width="35%"><a href=""><img src="http://www.aggrim.com/funfooding/images/funfooding.jpg" width="249" height="83" border="0" style="padding:30px 0 20px 0;" /></a></td>
 </tr>
    </table></td>
  </tr>
  <tr>
    <td valign="top" style="padding:10px 10px 0 10px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
     
      <tr>
        <td valign="top" bgcolor="#FFFFFF" style="border:#d4d4d4 solid 1px;  padding:0px 15px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
			  
			  <tr>
			   <td style="font:bold 13px/13px Verdana, Geneva, sans-serif; padding:10px; color:#F3C;">Message !
         </td>
			  </tr>
                  <tr>
                  <td style="padding:10px;">
                  <table>
                  <tr>
                  <td style="font:bold 13px/14px Verdana, Geneva, sans-serif    ;">
                  </td>
                  <td style=" font:normal 13px/13px Arial, Helvetica, sans-serif;">Hi ' . $re[1] . ' </br>
				  You have changed your password successfully
				  You can login <a href="aggrim.com//#/">here.</a>
                  </td></tr>
                  
                  </table>
                  </td>
                  </tr>
                  <tr>
                  <td style="padding:10px;">
                  <table>
                  <tr>
                  <td style="font:bold 13px/14px Verdana, Geneva, sans-serif  ;"> 
                  </td>
                 
                  </table>
                  </td>
                  </tr>
				  
				  
				   <tr>
                  <td style="padding:10px;">
                  <table>
                  <tr>
                  <td style="font:bold 13px/14px Verdana, Geneva, sans-serif  ;">Best regards,

                  </td>
                  <td style=" font:normal 13px/13px Arial, Helvetica, sans-serif;">Support Team
                  </td></tr>
                  
                  </table>
                  </td>
                  </tr>
          </table></td>
            </tr>
            <tr>
              <td valign="top" style="padding-top:10px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="74%" align="center" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                      
                    </table></td>
                    
                  </tr>

              </table></td>
            </tr>
        </table></td>
      </tr>
     
    </table></td>
  </tr>
    <tr> 
    <td valign="top" style="padding:10px 0px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" >
    
     
    
       <tr> <td align="center" style=" font:normal 13px/13px Arial, Helvetica, sans-serif; padding:20px;"> Copyright © 2015.funfooding.com All rights reserved.</td>
         
      </tr> 
 </table></td>
  </tr>

    </table></td>  
  </tr>
</table>
</body>
</html>';
        $mail = new PHPMailer;


        $mail->isSMTP();


        $mail->SMTPDebug = 3;


        $mail->Debugoutput = 'html';


        $mail->Host = 'smtp.bizmail.yahoo.com';


        $mail->Port = 465;

        $mail->SMTPSecure = 'ssl';
        $mail->SMTPAuth = true;

        $mail->Username = "noreply@aggrim.com";

        $mail->Password = "venkat123";

        $mail->setFrom('noreply@aggrim.com', 'Aggrim');

        $mail->addReplyTo('noreply@aggrim.com', 'Aggrim');

        $mail->addAddress($re[2], 'aggrim');

        $mail->WordWrap = 50;
        $mail->IsHTML(true);

        $mail->Subject = 'Changed password successfully';


        $mail->MsgHTML($body);

        $mail->AltBody = 'This is a plain-text message body';


        if (!$mail->send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            echo "Message sent!";
        }

        $database->query($sql);
        return ($database->affected_rows() == 1) ? true : false;
    }

    function viewall()
    {
        global $database;
        $sql = "SELECT * FROM users";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;
    }

    function select_details($data)
    {
        global $database;
        $sql = "SELECT * FROM userprofile WHERE UserId='" . $data . "'";
        $query = $database->query($sql);
        $row = $database->fetch_assoc($query);
        return $row;
    }


    function getusername($data)
    {
        global $database;
        $sql = "SELECT * FROM users WHERE client_id='" . $data . "'";
        $query = $database->query($sql);
        $row = $database->fetch_assoc($query);
        return $row;
    }

    function users_list()
    {
        global $database;
        $sql = "SELECT * FROM users";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;
    }

    function online_list()
    {
        global $database;
        $sql = "SELECT * FROM online_clients";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;
    }


    function check_availableclient($data)
    {
        global $database;
        $sql = "SELECT * FROM users WHERE client_id=" . $data . "";
        $result_set = $database->query($sql);
        $row = $database->fetch_assoc($result_set);
        return $row;

    }

    function online_statusconsultant($data)
    {
        global $database;
        $sql = "SELECT * FROM users WHERE client_id=" . $data . "";
        $result_set = $database->query($sql);

        $row = $database->fetch_assoc($result_set);

        return $row;
    }

    function check_availableconsultant()
    {
        global $database;
        $sql = "SELECT * FROM users WHERE  role=1";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;
    }

    function onlineconsultant()
    {
        global $database;
        $sql = "SELECT * FROM online_clients WHERE logged_in=1 AND role=1";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;
    }

    function check_availableconsultantclient()
    {
        global $database;
        $sql = "SELECT user_name,user_id FROM users WHERE logged_in=1 AND role=1 ORDER BY RAND() LIMIT 1";
        $result_set = $database->query($sql);
        $res = $database->fetch_assoc($result_set);
        return $res;
        //while ($row = $database->fetch_assoc($result_set))
//		{
//		$object_array[] =$row;
//		}
//		return $object_array;	
    }

    function client_mirror()
    {
        global $database;
        $sql = "SELECT * FROM users WHERE  role=2";
        $result_set = $database->query($sql);
        $object_array = array();
        while ($row = $database->fetch_assoc($result_set)) {
            $object_array[] = $row;
        }
        return $object_array;

    }

    function update_next($id)
    {
        global $database;
        $formid = rand();
        $_SESSION['formid_applicant'] = $formid;
        for ($i = 1; $i <= 4; $i++) {
            $sql = "UPDATE applicants SET formid='$formid',createddate=NOW() WHERE client_id=$id";
            $database->query($sql);
            self::update_formid($id, $_SESSION['formid_applicant']);
        }
    }

    function update_next_employ($id, $formid)
    {
        global $database;
        for ($i = 1; $i <= 4; $i++) {
            $sql = "UPDATE employment_income SET form_id='$formid',createddate=NOW() WHERE applicant_id=$i";
            $database->query($sql);
        }
    }

    function update_formid($id, $formid)
    {
        global $database;
        $sql = "UPDATE online_clients set formid = '$formid' WHERE user_id='$id'";
        $query = $database->query($sql);
    }

    function update_videocallid($id)
    {
        global $database;
        echo $sql = "UPDATE online_clients set video_callid=1 WHERE user_id=$id";
        $query = $database->query($sql);
    }


    function select_videocallid($id)
    {
        global $database;
        $sql = "select * from online_clients WHERE video_callid=$id";
        $result_set = $database->query($sql);
        $res = $database->fetch_assoc($result_set);
        return $res;
    }


}

?>