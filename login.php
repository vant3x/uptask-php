<?php 
    include_once './includes/funciones/helpers.php';
    include_once './includes/funciones/conexion.php';
    include_once './includes/templates/header.php'; 

?>
    <div class="contenedor-formulario">
        <h1><i class="fas fa-tasks"></i> UpTask</h1>
        <form id="formulario" class="caja-login" method="post">
             <div class="center">
                 <i class="fas fa-user-circle avatar-default-user"></i>
            </div>
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton btn-box-shadow" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="registrar.php" class="font-blue-light">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

<?php include_once  './includes/templates/footer.php'; ?>