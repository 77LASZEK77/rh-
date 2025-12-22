<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $department = htmlspecialchars($_POST['department']);
    $info = htmlspecialchars($_POST['info']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $captcha = htmlspecialchars($_POST['captcha']);

    if ($captcha != $_SESSION['captcha']) {
        echo "Błędny kod potwierdzający.";
        exit;
    }

    $to = "rejestracja@rhplus.com.pl";
    $email_subject = "Wiadomość z formularza kontaktowego: " . $subject;
    $email_body = "Imię i Nazwisko: $name\nE-mail: $email\nDział: $department\nInformacja dla pacjenta: $info\nTemat: $subject\nWiadomość: $message\nKod potwierdzający: $captcha";

    $headers = "From: $email";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Wiadomość została wysłana pomyślnie.";
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości.";
    }
} else {
    echo "Nieprawidłowa metoda żądania.";
}
?>
