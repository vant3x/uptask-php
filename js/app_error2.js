eventListeners();
// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');
var inputProyectosContainter = document.querySelector('ul#input-proyectos-container');
var evitarRepetir = 0;

function eventListeners() {
	// boton para crear proyecto
	document.querySelector('.crear-proyecto a').addEventListener("click", nuevoProyecto);
	// si quitas esta linea funciona
  // Boton para una nueva tarea
    if(document.querySelector('.nueva-tarea') !== null ) {
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }
    
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
  		alert("eliminando");
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
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);
    
    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            

        }
    }
    // enviar la petición
    xhr.send(datos);
}