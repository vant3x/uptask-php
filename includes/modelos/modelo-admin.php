<?php 

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];
$email = $_POST['email'];


if ($accion === 'crear') {
	// hashear password
	$opciones  = array(
		'cost' => 10
	);

	$hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
	// importar conexion
	include_once '../funciones/conexion.php';

	try {
		// consulta bd
		$stmt = 
			$conn->prepare("INSERT INTO usuarios (email, usuario, password) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $email, $test, $usuario  , $hash_password);
		$stmt->execute();
		if ($stmt->affected_rows > 0) {
		     $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
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
			'pass' => $e->getMessage()
		);
	}

    echo json_encode($respuesta);

	
}

if ($accion === 'login') {
	//
}