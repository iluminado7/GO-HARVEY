<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Solo POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("ERROR");
}

// Honeypot
if (!empty($_POST["website"])) {
    exit("BOT");
}

// Función limpiar
function limpiar($dato) {
    return htmlspecialchars(trim($dato), ENT_QUOTES, 'UTF-8');
}

// Datos
$nombre = limpiar($_POST["nombre"] ?? '');
$apellido = limpiar($_POST["apellido"] ?? '');
$empresa = limpiar($_POST["empresa"] ?? '');
$email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
$telefono = limpiar($_POST["telefono"] ?? '');
$pais = limpiar($_POST["pais"] ?? '');
$mensaje = limpiar($_POST["mensaje"] ?? '');

// Validaciones
if (!$nombre || !$apellido || !$empresa || !$email || !$telefono || !$pais || !$mensaje) {
    exit("ERROR");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("EMAIL");
}

// ================= DB =================
$conn = new mysqli("localhost", "root", "", "form_contactos_goharvey");

if ($conn->connect_error) {
    exit("DB");
}

$stmt = $conn->prepare("INSERT INTO contactos (nombre, apellido, empresa, email, telefono, pais, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nombre, $apellido, $empresa, $email, $telefono, $pais, $mensaje);
$stmt->execute();

// ================= MAIL =================
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'fdromero01@gmail.com';
    $mail->Password = 'yclhppilrvvzwnoz';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('fdromero01@gmail.com', 'Franco Romero');
    $mail->addAddress('fdromero01@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Nuevo contacto desde la web';

    $mail->Body = "
        <h2>Nuevo contacto</h2>
        <p><strong>Nombre:</strong> $nombre $apellido</p>
        <p><strong>Empresa:</strong> $empresa</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Teléfono:</strong> $telefono</p>
        <p><strong>País:</strong> $pais</p>
        <p><strong>Mensaje:</strong><br>$mensaje</p>
    ";

    $mail->AltBody = "Nuevo contacto de $nombre $apellido";

    $mail->send();

    echo "OK";

} catch (Exception $e) {
    echo "MAIL_ERROR";
}