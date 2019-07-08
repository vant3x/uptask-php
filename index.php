<?php 
    include_once './includes/funciones/sessions.php';
    include_once './includes/funciones/helpers.php';
    include_once './includes/templates/header.php';
    include_once './includes/templates/barra.php';

 ?>


 
<div class="contenedor">
   <?php include_once './includes/templates/sidebar.php' ?>

    <main class="contenido-principal animated bounceInDown">

        <h1><bold class="font-blue-light">Proyecto Actual:</bold>
            <span>Diseño de Página Web</span>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="id_proyecto">
                <input type="submit" class="boton btn-box-shadow  nueva-tarea" value="Agregar">
            </div>
        </form>
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash color-red"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php include_once  './includes/templates/footer.php'; ?>