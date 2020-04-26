<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

if (empty($_POST['nombre']) || empty($_POST['email'])) die();

if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);
	$subject = "Nueva mensaje desde página web";
	$to = "apoyo@origen.org.pe";
	$from = $_POST['email'];

    // data
    
    $email_message .= "Nombre: ".clean_string($_POST['nombre'])."\n";
    $email_message .= "Ciudad: ".clean_string($_POST['project'])."\n";
    $email_message .= "Email: ".clean_string($_POST['email'])."\n";
    $email_message .= "Mensaje: ".clean_string($_POST['message'])."\n";

	// Headers

	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: <" . $from . ">";
	$result = mail($to, $subject, $email_message, $headers);

	// echo json_encode( $_POST );

    if($result){
        echo json_encode(["sent" => true, "message" => "Success"]);
    }
    else{
        echo json_encode(["sent" => false, "message" => "Failure"]);
    }
	
	}   
  else
	{

	// tell the user about error

	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>