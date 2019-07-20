<?php 

error_reporting(E_ALL ^ E_NOTICE);

$accion = $_POST['accion'];
$id_proyecto = (int) $_POST['id_proyecto'];
$tarea = $_POST['tarea'];
session_start();
$id_usuario = $_SESSION['id'];
$id_tarea = (int) $_POST['id'];
$estado = $_POST["estado"];
$date=date("y/m/d");

if ($accion === 'crear') {
	// importar conexion
	include_once '../funciones/conexion.php';
	try {
		// consulta bd
		$stmt = 
			$conn->prepare("INSERT INTO tareas (nombre, id_proyecto, id_usuario, fecha_creacion) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('siis', $tarea, $id_proyecto,$id_usuario, $date);
		$stmt->execute();
		if ($stmt->affected_rows > 0) {
		     $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion,
                'nombre_tarea' => $tarea,
                'fecha_creacion' => $date,
                'id_usuario' => $id_usuario,
                'id_proyecto' => $id_proyecto
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

// actualizar tareas 

if ($accion === 'actualizar') {
		// importar conexion
	include_once '../funciones/conexion.php';
	try {
		// consulta bd
		$stmt = 
			$conn->prepare("UPDATE tareas set estado = ? WHERE id = ?");
        $stmt->bind_param('ii', $estado, $id_tarea);
		$stmt->execute();
		if ($stmt->affected_rows > 0) {
		     $respuesta = array(
                'respuesta' => 'correcto'
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