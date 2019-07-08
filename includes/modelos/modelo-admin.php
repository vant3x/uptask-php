<?php 

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];
if ($_POST['email']) {
	$email = $_POST['email'];
}
 

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
        $stmt->bind_param('sss', $email, $usuario  , $hash_password);
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

// 

if ($accion === 'login') {
	include_once '../funciones/conexion.php';

	try {
		$stmt = $conn->prepare("SELECT usuario, email, id, password, nombre, apellidos, avatar FROM usuarios WHERE usuario = ?");
		$stmt->bind_param('s', $usuario);
		$stmt->execute();
		// login
		$stmt->bind_result(
			$nombre_usuario, 
			$email_usuario, 
			$id_usuario, 
			$pass_usuario,
			$nombre,
			$apellidos,
			$avatar
		);
		$stmt->fetch();
		if ($nombre_usuario) {
			 if (password_verify($password, $pass_usuario)) {
			 	// iniciar session
			 	session_start();
			 	$_SESSION['usuario'] = $nombre_usuario;
			 	$_SESSION['id'] = $id_usuario;
			 	$_SESSION['login'] = true;
 			 	// Login Correcto
				  $respuesta = array(
					'respuesta' => 'correcto',
					'id' => $id_usuario,
					'usuario' => $nombre_usuario,
					'email' => $email_usuario,
					'password' => $pass_usuario,
					'nombre_real' => $nombre,
					'apellidos' => $apellidos,
					'avatar' => $avatar,
					'tipo' => $accion
				 ); 
			 } else {
			 	$respuesta = array(
			 		'resultado' => 'Password incorrecto'
			 	);
			 }
		} else {
			$respuesta = array(
				'error' => 'El Usuario no existe'
			);
		}
		$stmt->close();
		$conn->close();
	} catch (Exception $e) {
		$respuesta = array(
			'pass' => $e->getMessage()
		);
	}

	 echo json_encode($respuesta);
}