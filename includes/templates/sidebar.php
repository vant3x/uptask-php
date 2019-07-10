 <aside class="contenedor-proyectos">
        <div class="usuario-basic-info  animated bounceInDown">
            <i class="fas fa-user-circle avatar-default"></i>
           <h2 class="nombre-usuario"> <?=$_SESSION['usuario'];?></h2>
           <a href="usuario.php?id=<?=$_SESSION['id'];?>">Ir al Perfil</a>
        </div>
        <div class="panel crear-proyecto  animated bounceInDown">
            <a href="#" class="boton btn-box-shadow">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>
    
        <div class="panel lista-proyectos  animated bounceInDown">
            <h2>Proyectos</h2>
            <ul style="display:none;" id="input-proyectos-container"></ul>
            <ul id="proyectos">
                <?php 
                    $proyectos = obtenerProyectos();
                    if ($proyectos) {
                        foreach ($proyectos as $proyecto) { ?>
                            <li>
                            <a href="index.php?id_proyecto=<?=$proyecto['id']?>" id="<?=$proyecto['id']?>">
                                <?=$proyecto['nombre']?></a>
                            </li>
                       <?php }   
                    }
                ?>
            </ul>
        </div>
    </aside>