eventListeners();
// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');
var inputProyectosContainter = document.querySelector('ul#input-proyectos-container');
let evitarRepetir = 0;

function eventListeners() {
	// boton para crear proyecto
	document.querySelector('.crear-proyecto a').addEventListener("click", nuevoProyecto);
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
	let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

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
	
	});
}

function guardarProyectoDB(nombreProyecto) {
	// Crear llamado AJAX
	var xhr = new XMLHttpRequest();
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
								window.location.href = 'index.php?id_respuesta=' + id_proyecto;
							}
						})

						// redireccionar a la nueva URL
						setTimeout(function() {
							window.location.href = 'index.php?id_respuesta=' + id_proyecto;
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

