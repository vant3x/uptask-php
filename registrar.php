<?php
    include_once './includes/funciones/helpers.php';
    include_once './includes/funciones/conexion.php';
    include_once './includes/templates/header.php'; 

?>

    <div class="contenedor-formulario">
        <h1>
            <i class="fas fa-tasks"></i> UpTask <span>Crear Cuenta</span>
        </h1>
        <form id="formulario" class=" caja-login animated bounceInDown" method="post">
            
            <div class="center">
                 <i class="fas fa-user-circle avatar-default-user"></i>
            </div>

            <div class="campo">
                <label for="usuario">Email: </label>
                <input type="email" name="email" id="email" placeholder="Email">
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
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton btn-box-shadow" value="Crear cuenta">
            </div>
            <div class="campo">
                <a href="login.php" class="font-blue-light">Inicia Sesión Aquí</a>
            </div>
        </form>
    </div>

<?php include_once  './includes/templates/footer.php'; ?>