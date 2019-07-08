 <script src="js/sweetalert2.all.min.js"></script>
<?php 
	$actual = obtenerPaginaActual();
	if ($actual === 'registrar' || $actual === 'login') {
		echo '<script src="js/formulario.js"></script>';
	} else {
		echo '<script src="js/app.js"></script>';
	}
?>

</body>
</html>