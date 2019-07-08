eventListeners();
// lista de proyectos
let listaProyectos = document.querySelector('ul#proyectos');
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
		let inputProyectoElement = '<input required class="animated heartBeat" placeholder="Nombre del Proyecto" style="padding:8px 10px;" type="text" id="nuevo-proyecto"><li id="position-alert">';
		nuevoProyecto.innerHTML = inputProyectoElement;
		listaProyectos.appendChild(nuevoProyecto);
		// boton
		var containerBtnCrear = document.createElement('div');
		let btnCrearProyecto = '<input type="submit" id="btnGuardarProyecto" class="boton-no-upper btn-box-shadow animated heartBeat" value="Guardar">';
		containerBtnCrear.innerHTML = btnCrearProyecto;
		listaProyectos.appendChild(containerBtnCrear);
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
				document.querySelector('#alerta').remove();


			} else {
				if (!document.querySelector('#alerta')) {
					var alertError = document.createElement('li');
					alertError.innerHTML = '<p class="alert-error" id="alerta">Campo obligatorio</p>';
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
				alertError.innerHTML = '<p class="alert-error" id="alerta">Campo obligatorio</p>';
				document.querySelector('#position-alert').appendChild(alertError);
			}
		}
	
	});
}

function guardarProyectoDB(nombreProyecto) {
	// console.log(nombreProyecto);
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
			console.log(JSON.parse(xhr.responseText));
		}
	}

	// enviar al request
	xhr.send(datos);
}
/*

	let nuevoProyectoList = document.createElement('li');
	nuevoProyectoList.innerHTML = ` 
		<a href="#">
			${nombreProyecto}
		</a>
	`;
	listaProyectos.appendChild(nuevoProyectoList);

	*/
