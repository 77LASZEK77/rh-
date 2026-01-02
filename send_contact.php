<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit;
}

$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$department = htmlspecialchars($_POST['department'] ?? '');
$subject = htmlspecialchars($_POST['subject'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

$to = "batlomiejlach.7@gmail.com";
$email_subject = "Formularz RH+ – $subject";

$email_body =
"Imię i nazwisko: $name
Email: $email
Dział: $department

Wiadomość:
$message";

$headers = "From: $email";

if (mail($to, $email_subject, $email_body, $headers)) {
    echo "OK";
} else {
    echo "ERROR";
}
