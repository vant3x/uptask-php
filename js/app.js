eventListeners();
// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');
var inputProyectosContainter = document.querySelector('ul#input-proyectos-container');
var evitarRepetir = 0;

function eventListeners() {

	// Document Ready 
	document.addEventListener('DOMContentLoaded', function() {
		actualizarProgreso();
	});

	// boton para crear proyecto
	document.querySelector('.crear-proyecto a').addEventListener("click", nuevoProyecto);
	// si quitas esta linea funciona

  // Boton para una nueva tarea
    if(document.querySelector('.nueva-tarea') !== null ) {
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }


    // Botones para las acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
    
}

function nuevoProyecto(e) {
	e.preventDefault();

	// Crea un input para nuevo proyecto

	// validar que solo se cree una vez el input
	if (evitarRepetir <= 0) {
		evitarRepetir++;

		var nuevoProyecto = document.createElement('li');	
		let inputProyectoElement = '<input required class="animated heartBeat input-proyecto" placeholder="Nombre del Proyecto" type="text" id="nuevo-proyecto"><li id="position-alert">';
		nuevoProyecto.innerHTML = inputProyectoElement;
		inputProyectosContainter.appendChild(nuevoProyecto);
		// boton
		var containerBtnCrear = document.createElement('div');
		let btnCrearProyecto = '<input type="submit" id="btnGuardarProyecto" class="boton-no-upper btn-box-shadow animated heartBeat" value="Guardar">';
		containerBtnCrear.innerHTML = btnCrearProyecto;
		inputProyectosContainter.appendChild(containerBtnCrear);
		inputProyectosContainter.style.display = 'block';
	}

	// seleccionar el id con el nuevo proyecto
	let inputNuevoProyecto = document.getElementById('nuevo-proyecto');

	// al presionar enter crear el proyecto
	inputNuevoProyecto.addEventListener('keypress', function (e) {
		let tecla = e.wich || e.keyCode;

		if (tecla === 13) {
			
			if (inputNuevoProyecto.value !== '') {
				guardarProyectoDB(inputNuevoProyecto.value);
				// desaparecer input y boton
				listaProyectos.removeChild(nuevoProyecto);
				listaProyectos.removeChild(containerBtnCrear);
				evitarRepetir = 0;
				if (document.querySelector('#alerta')) {
					document.querySelector('#alerta').remove();
				}

			} else {
				if (!document.querySelector('#alerta')) {
					var alertError = document.createElement('li');
					alertError.innerHTML = '<p class="alert-error animated heartBeat" id="alerta">Campo obligatorio</p>';
					document.querySelector('#position-alert').appendChild(alertError);
				}
			}
		}
	});
	// si click en boton guardar
	document.querySelector('#btnGuardarProyecto').addEventListener('click', function (e) {
		if (inputNuevoProyecto.value !== '') {
			guardarProyectoDB(inputNuevoProyecto.value);
			// desaparecer input y boton
			inputProyectosContainter.removeChild(nuevoProyecto);
			inputProyectosContainter.removeChild(containerBtnCrear);
			evitarRepetir = 0;
			if (document.querySelector('#alerta')) {
				document.querySelector('#alerta').remove();
			}
			
		} else {
			if (!document.querySelector('#alerta')) {
				var alertError = document.createElement('li');
				alertError.innerHTML = '<p class="alert-error animated heartBeat" id="alerta">Campo obligatorio</p>';
				document.querySelector('#position-alert').appendChild(alertError);
			}
		}
	
	});
}

function guardarProyectoDB(nombreProyecto) {
	// Crear llamado AJAX
	let xhr = new XMLHttpRequest();
	// enviar datos
	var datos = new FormData();
	datos.append('proyecto', nombreProyecto);
	datos.append('accion','crear');

	// abrir conexion
	xhr.open('POST','includes/modelos/modelo-proyecto.php', true);

	// en la carga 
	xhr.onload = function() {
		if (this.status === 200) {
			// obtener datos de la respuesta
			let respuesta = JSON.parse(xhr.responseText);
			let proyecto = respuesta.nombre_proyecto,
				id_proyecto = respuesta.id_insertado,
				id_usuario = respuesta.id_usuario,
				fecha_creacion = respuesta.fecha_creacion,
				tipo = respuesta.tipo,
				resultado = respuesta.respuesta;

				// Comprobar la inserccion
				if (resultado === 'correcto') {
					if (tipo === 'crear') {
						// inyectar en el HTML
						let nuevoProyectoList = document.createElement('li');
						nuevoProyectoList.innerHTML = `
							<a href="index.php?id_respuesta=${id_proyecto}" id="${id_proyecto}">
								${proyecto}
							</a>
						`;	
						// agregar al html
						listaProyectos.appendChild(nuevoProyectoList);

						// agregar alerta o mensaje personalizado
						swal({
							title: 'Proyecto Creado!',
							text: 'El Proyecto: ' + proyecto + ' se creó correctamente',
							type: 'success'

						})
						.then(resultado => {
							if (resultado.value) {
								window.location.href = 'index.php?id_proyecto=' + id_proyecto;
							}
						})

						// redireccionar a la nueva URL
						setTimeout(function() {
							window.location.href = 'index.php?id_proyecto=' + id_proyecto;
						},1700);
					} else {
						// se actualizo o se elimino
					}
				} else {
					swal({
						type:'error',
						title:'Error',
						text: 'Hubo un error!'
					})
				}
		}
	}

	// enviar al request
	xhr.send(datos);
}

// Agregar tarea al proyecto actual

function agregarTarea (e) {
	e.preventDefault();

	var nombreTarea = document.querySelector('.nombre-tarea').value;
	// validar que el campo no esté vacío
	if (nombreTarea === '') {
		swal({
			title: 'Error',
			text: 'El campo nombre no puede estar vacío',
			type: 'error'
		});
	} else {
		let xhr = new XMLHttpRequest();
		let datos = new FormData();
		let id_proyecto_actual = document.querySelector('#id_proyecto').value; 
		datos.append('tarea',nombreTarea);
		datos.append('accion','crear');
		datos.append('id_proyecto', id_proyecto_actual);


		xhr.open('POST','includes/modelos/modelo-tareas.php',true);

		xhr.onload = function() {
			if (this.status === 200) {
				var respuesta = JSON.parse(xhr.responseText);
				// asignar valores
				let resultado = respuesta.respuesta,
					tarea = respuesta.nombre_tarea,
					id_insertado = respuesta.id_insertado,
					tipo = respuesta.tipo;

				if(resultado === 'correcto') {
					if (tipo === 'crear') {
						swal({
							type:'success',
							title: 'Tarea Creada',
							text: 'La tarea se creó con éxito!'
						});

						// seleccionar el parro con la lista vacia 
						var parrafoListaVacia = document.querySelectorAll('.lista-vacia');
						if (parrafoListaVacia.length > 0) {
							document.querySelector('.lista-vacia').remove();
						}

						// template
						let nuevaTarea = document.createElement('li');

						// agregar el ID
						nuevaTarea.id = 'tarea:'+id_insertado;

						// clase tarea
						nuevaTarea.classList.add('tarea');

						// insertar en el html
						nuevaTarea.innerHTML = `
							<p>${tarea}</p>
							<div class="acciones">
								<i class="far fa-check-circle"></i>
								<i class="fas fa-trash"></i>
							</div>
						`;

						// agregarlo al dom
						var listadoTareas = document.querySelector('.listado-pendientes ul');
						listadoTareas.appendChild(nuevaTarea);

						// limpiar formulario
						document.querySelector('.agregar-tarea').reset();

						// actualizar el progreso
						actualizarProgreso();
					}
				} else {
					// hubo un error
					swal({
						type: 'error',
						title: 'Error',
						text: 'Hubo un error al agregar la tarea'
					});
				}
			}
		}
		xhr.send(datos);
	}
}

// Cambia el estado de las tareas o las elimina

function accionesTareas(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('fa-check-circle')) {
        if(e.target.classList.contains('completo')) {
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        } else {
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }
    
    if(e.target.classList.contains('fa-trash')) {
    	 swal({
          title: 'Seguro(a)?',
          text: "Esta acción no se puede deshacer",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
        


          if (result.value) {   
          	let tareaEliminar = e.target.parentElement.parentElement;     
          	// borrar de bd
          	elimarTareaBD(tareaEliminar);

        	// borrar de html   
        	tareaEliminar.remove();
            swal(
              'Eliminado!',
              'La tarea fue eliminada!.',
              'success'
            )
          }
        })
    } 
}
// Completa o descompleta una tarea
function cambiarEstadoTarea(tarea, estado) {
    var idTarea = tarea.parentElement.parentElement.id.split(':');
    
    // crear llamado ajax
    var xhr = new XMLHttpRequest();
    
    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);
    
    // abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);
    
    // on load
    xhr.onload = function() {
        if (this.status === 200) {
           // console.log(JSON.parse(xhr.responseText));
            let respuesta = JSON.parse(xhr.responseText);
            actualizarProgreso();
        }
    }
    // enviar la petición
    xhr.send(datos);
}

// elimina las tareas

function elimarTareaBD(tarea) {
	var idTarea = tarea.id.split(':');
    
    // crear llamado ajax
    var xhr = new XMLHttpRequest();
    
    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    
    // abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-tareas.php', true);
    
    // on load
    xhr.onload = function() {
        if (this.status === 200) {
        	// console.log(JSON.parse(xhr.responseText));

            let respuesta = JSON.parse(xhr.responseText);

            // comprobar que haya tareas restantes
            var listaTareasRestantes = document.querySelectorAll('li.tarea');
            if (listaTareasRestantes.length === 0) {
            	document.querySelector('.listado-pendientes ul').innerHTML = "<p class='lista vacia'>No hay tareas en este proyecto</p>";
            }

            // actualizar el progresp
            actualizarProgreso();
        }
    }
    // enviar la petición
    xhr.send(datos);
}


// actualizar el avance del proyecto

function actualizarProgreso() {
	const tareas = document.querySelectorAll('li.tarea');

	// obtener las tareas compeletadas 
	const tareasCompletadas = document.querySelectorAll('i.completo');

	// determinar el avance
	const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);

	// asignar el avance a la barra
	const porcentaje = document.querySelector('#porcentaje');
	porcentaje.style.width = avance+'%';

	console.log(avance);
}