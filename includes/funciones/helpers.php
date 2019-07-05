<?php 

function obtenerPaginaActual () {
	$archivo = basename($_SERVER['PHP_SELF']);
	$pagina = str_replace(".php","", $archivo);
	//echo $archivo;
	//echo $pagina;
	return $pagina;
}

