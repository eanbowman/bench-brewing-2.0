<?php
header("Access-Control-Allow-Origin: http://benchbrewing.com");

//if(isset($_POST['submit'])) {
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];
$to = 'info@benchbrewing.com';


    $headers="From: {$email}\r\nReply-To: {$email}";
    mail($to,$subject,$message,$headers);
    $success = "Thank you! You're email has been sent.";
    echo $success;

//}

?> 