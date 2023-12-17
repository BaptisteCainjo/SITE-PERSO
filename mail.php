
<?php
if (isset($_GET['email'])) {
    // Destinataire de l'email
    $to = "contact@baptistecainjo.fr";
    // Sujet de l'email
    $subject = "Nouveau message du formulaire de contact";

    // Message de l'email
    $message = "Nom: " . $_GET['nom'] . "\n\n";
    $message .= "Email: " . $_GET['email'] . "\n\n";
    $message .= "Message:\n" . $_GET['message'];

    // En-têtes de l'email
    $headers = "From: " . $_GET['email'] . "\r\n";
    $headers .= "Reply-To: " . $_GET['email'] . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoyer l'email
    mail($to, $subject, $message, $headers);

    // Rediriger l'utilisateur vers une page de confirmation
    header('Location: index.html#part5');
}
?>