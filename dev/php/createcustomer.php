<?php
include_once 'dbconnect.php';

        $fname = mysql_real_escape_string($_POST['firstname']);
        $lname = mysql_real_escape_string($_POST['lastname']);
        $telnum = mysql_real_escape_string($_POST['telnum']);
        $email = mysql_real_escape_string($_POST['email']);
        $city =  mysql_real_escape_string($_POST['city']);
	$state = mysql_real_escape_string($_POST['state']);
	$street = mysql_real_escape_string($_POST['street']);
        $zip = mysql_real_escape_string($_POST['zipcode']);
        if(mysql_query("INSERT INTO customer (first_name,last_name,street,city,state,zipcode,phone_number,email) VALUES('$fname','$lname','$street','$city','$state', $zip, $telnum, '$email')"))
        {
                echo "1";
        }else
        {
                echo "failed";
		
		
        }







?>
