<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Anti-spam
if (!empty($_POST["website"])) {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Email inválido");
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'fdromero01@gmail.com';
        // 🔴 IMPORTANTE: contraseña de aplicación (NO tu contraseña normal)
        $mail->Password = 'yclhppilrvvzwnoz';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('fdromero01@gmail.com', 'Franco Romero');
        $mail->addAddress('fdromero01@gmail.com');

        $mail->isHTML(true);

        $mail->Subject = 'Nueva suscripción - Go Harvey';

        $mail->Body = "
            <h2>Nueva suscripción</h2>
            <p>El siguiente correo desea recibir notificaciones de Go Harvey:</p>
            <p><strong>$email</strong></p>
        ";

        $mail->AltBody = "Nueva suscripción\n\nEl correo $email quiere recibir notificaciones de Go Harvey.";

        $mail->send();
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}