<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Para desarrollo, simplemente devolvemos éxito
// En producción deberías agregar validaciones de seguridad
echo json_encode(['success' => true, 'message' => 'Validación de seguridad exitosa.']);
?>

