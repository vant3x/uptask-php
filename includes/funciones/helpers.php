<?php 
// Obtiene la página actual que se ejecuta
function obtenerPaginaActual () {
	$archivo = basename($_SERVER['PHP_SELF']);
	$pagina = str_replace(".php","", $archivo);
	//echo $archivo;
	//echo $pagina;
	return $pagina;
}


/* Consultas */ 


/* Obtener todos los proyectos */

function obtenerProyectos () {
	include 'conexion.php';
	$id_usuario = $_SESSION['id'];
	try {
		return $conn->query("SELECT * FROM proyectos WHERE id_usuario = $id_usuario");
	} catch (Exception $e) {
		echo "Error! :" . $e->getMessage();
		return false;
	}
}

// Obtener nombre del proyecto 
function obtenerNombreProyecto($id = null) {
	include 'conexion.php';

	try {
		return $conn->query("SELECT nombre FROM proyectos WHERE id = {$id}");
	} catch (Exception $e) {
		echo "Error! :" . $e->getMessage();
		return false;
	}

}