<?php 
    include_once './includes/funciones/sessions.php';
    include_once './includes/funciones/helpers.php';
    include_once './includes/templates/header.php';
    include_once './includes/templates/barra.php';

    // Obtener el ID de la url
    $id_proyecto = '';
    if (isset($_GET['id_proyecto'])) {
        $id_proyecto = $_GET['id_proyecto'];
    }

 ?>


 
<div class="contenedor">
   <?php include_once './includes/templates/sidebar.php' ?>

    <main class="contenido-principal animated bounceInDown">

    <?php 
        $proyecto = obtenerNombreProyecto($id_proyecto);
        if ($proyecto): ?>
            <h1><bold class="font-blue-light">Proyecto Actual:</bold>

            <?php foreach ($proyecto as $nombre):  ?>
                <span><?= $nombre['nombre']; ?></span>
            <?php endforeach; ?> 
            </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?=$id_proyecto;?>">
                <input type="submit" class="boton btn-box-shadow  nueva-tarea" value="Agregar">
            </div>
        </form>
        <?php /* descomentar en caso de erro(esta mas abajo este bloque)
            else:
                // Si no hay proyectos seleccionados
                echo "<h3>Selecciona un Proyecto a la izquierda</h3>";
            endif; */
        ?>

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
            <?php 
                // obtiene las tareas del proyecto actual
                $tareas = obtenerTareasProyecto($id_proyecto);
                if ($tareas->num_rows > 0) {
                    // si hay tareas
                    foreach ($tareas as $tarea):   ?>
                        <li id="tarea:<?=$tarea['id']; ?>" class="tarea">
                        <p><?= $tarea['nombre']; ?></p>
                            <div class="acciones">
                                <i class="far fa-check-circle <?= ($tarea['estado'] === '1' ? 'completo' : '') ?>"></i>
                                <i class="fas fa-trash color-red"></i>
                            </div>
                        </li>  
                  <?php  endforeach;
                } else {
                    // no hay tareas
                    echo "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
                }
            ?>

            </ul>
        </div>

        <?php 
            else:
                // Si no hay proyectos seleccionados
                echo "<h3>Selecciona un Proyecto a la izquierda</h3>";
            endif;
        ?>

    </main>
</div><!--.contenedor-->

<?php include_once  './includes/templates/footer.php'; ?>