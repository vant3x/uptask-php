<?php 

$accion = $_POST['accion'];
$proyecto = $_POST['proyecto'];
session_start();
$id_usuario = $_SESSION['id'];
$date=date("y/m/d");

if ($accion === 'crear') {
	// importar conexion
	include_once '../funciones/conexion.php';

	try {
		// consulta bd
		$stmt = 
			$conn->prepare("INSERT INTO proyectos (nombre, id_usuario, fecha_creacion) VALUES (?, ?, ?)");
        $stmt->bind_param('sis', $proyecto, $id_usuario, $date);
		$stmt->execute();
		if ($stmt->affected_rows > 0) {
		     $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion,
                'nombre_proyecto' => $proyecto,
                'id_usuario' => $id_usuario
            );
        }  else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
		$stmt->close();
		$conn->close();
	} catch (Exception $e) {
		// en caso de error tomar la excepción
		$respuesta = array(
			'error' => $e->getMessage()
		);
	}

    echo json_encode($respuesta);
}
