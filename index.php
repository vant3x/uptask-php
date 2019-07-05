<?php 
    include_once './includes/funciones/helpers.php';

    include_once './includes/templates/header.php';
 ?>


<div class="barra">
    <h1><i class="fas fa-tasks"></i> UpTask - Administración de Proyectos</h1>
    <a href="#"> <i class="fas fa-sign-out-alt"></i>  Cerrar Sesión</a>
</div>

<div class="contenedor">
    <aside class="contenedor-proyectos">
        <div class="panel crear-proyecto">
            <a href="#" class="boton btn-box-shadow">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>
    
        <div class="panel lista-proyectos">
            <h2>Proyectos</h2>
            <ul id="proyectos">
                <li>
                    <a href="#">
                        Diseño Página Web
                    </a>
                </li>
                <li>
                    <a href="#">
                        Nuevo Sitio en wordPress
                    </a>
                </li>
            </ul>
        </div>
    </aside>

    <main class="contenido-principal">

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


<script src="js/sweetalert2.all.min.js"></script>


</body>
</html>