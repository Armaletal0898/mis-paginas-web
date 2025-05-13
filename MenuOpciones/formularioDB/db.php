<?php
// Configuración de la conexión a la base de datos MySQL en InfinityFree
$host = "sql306.infinityfree.com"; // Host de la base de datos
$user = "if0_38965765"; // Nombre de usuario de MySQL proporcionado por InfinityFree
$pass = "4ZzjDuCCwBcv"; // Contraseña de MySQL (debes mantenerla segura)
$dbname = "if0_38965765_formulariodb"; // Nombre de la base de datos (sin espacios)

// Se crea la conexión usando la extensión mysqli
$conn = new mysqli($host, $user, $pass, $dbname);

// Se verifica si hubo un error al conectar
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error); // Muestra un mensaje y detiene la ejecución si falla la conexión
}
?>