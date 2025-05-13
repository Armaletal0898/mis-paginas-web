<?php
// Habilita la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluye el archivo de conexión a la base de datos
include 'db.php';

// Establece el tipo de contenido de la respuesta como JSON
header('Content-Type: application/json');

// Obtiene el método HTTP de la petición
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Obtiene todos los registros de la base de datos y los devuelve en formato JSON
        $result = $conn->query("SELECT * FROM registros");
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;

    case 'POST':
        // Si la petición es para borrar un registro
        if (isset($_POST['action']) && $_POST['action'] === 'delete') {
            $id = $_POST['id'];
            if ($id) {
                // Elimina el registro con el ID proporcionado
                $stmt = $conn->prepare("DELETE FROM registros WHERE id=?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'ID vacío']);
            }
            break;
        }
        // Obtiene los datos enviados por el formulario
        $id = $_POST['id'] ?? '';
        $nombre = trim($_POST['nombre']);
        $apellido = trim($_POST['apellido']);
        $email = trim($_POST['email']);
        $contacto = trim($_POST['contacto']);
        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $direccion = $_POST['direccion'];
        $genero = $_POST['genero'];
        $comentarios = $_POST['comentarios'];

        if ($id) {
            // Verifica si ya existe otro registro con el mismo email o contacto (ignorando mayúsculas/minúsculas y excluyendo el actual)
            $stmt = $conn->prepare("SELECT id FROM registros WHERE (LOWER(TRIM(email))=LOWER(TRIM(?)) OR LOWER(TRIM(contacto))=LOWER(TRIM(?))) AND id<>?");
            $stmt->bind_param("ssi", $email, $contacto, $id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(['success' => false, 'error' => 'Ya existe un registro con este email o contacto.']);
                break;
            }
            $stmt->close();

            // Verifica si ya existe otro registro con el mismo nombre y apellido (ignorando mayúsculas/minúsculas y excluyendo el actual)
            $stmt = $conn->prepare("SELECT id FROM registros WHERE LOWER(TRIM(nombre))=LOWER(TRIM(?)) AND LOWER(TRIM(apellido))=LOWER(TRIM(?)) AND id<>?");
            $stmt->bind_param("ssi", $nombre, $apellido, $id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(['success' => false, 'error' => 'Ya existe un registro con este nombre y apellido.']);
                break;
            }
            $stmt->close();

            $stmt = $conn->prepare("UPDATE registros SET nombre=?, apellido=?, email=?, contacto=?, fecha_nacimiento=?, direccion=?, genero=?, comentarios=? WHERE id=?");
            $stmt->bind_param("ssssssssi", $nombre, $apellido, $email, $contacto, $fecha_nacimiento, $direccion, $genero, $comentarios, $id);
            $stmt->execute();
        } else {
            // Verifica si ya existe un registro con el mismo email o contacto (ignorando mayúsculas/minúsculas)
            $stmt = $conn->prepare("SELECT id FROM registros WHERE LOWER(TRIM(email))=LOWER(TRIM(?)) OR LOWER(TRIM(contacto))=LOWER(TRIM(?))");
            $stmt->bind_param("ss", $email, $contacto);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(['success' => false, 'error' => 'Ya existe un registro con este email o contacto.']);
                break;
            }
            $stmt->close();

            // Verifica si ya existe un registro con el mismo nombre y apellido (ignorando mayúsculas/minúsculas)
            $stmt = $conn->prepare("SELECT id FROM registros WHERE LOWER(TRIM(nombre))=LOWER(TRIM(?)) AND LOWER(TRIM(apellido))=LOWER(TRIM(?))");
            $stmt->bind_param("ss", $nombre, $apellido);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(['success' => false, 'error' => 'Ya existe un registro con este nombre y apellido.']);
                break;
            }
            $stmt->close();

            $stmt = $conn->prepare("INSERT INTO registros (nombre, apellido, email, contacto, fecha_nacimiento, direccion, genero, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssss", $nombre, $apellido, $email, $contacto, $fecha_nacimiento, $direccion, $genero, $comentarios);
            $stmt->execute();
        }
        echo json_encode(['success' => true]);
        break;
}

// Cierra la conexión a la base de datos
$conn->close();
?>