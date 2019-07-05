eventListeners();

function eventListeners() {
	document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
	e.preventDefault();

	var email = document.querySelector('#email').value,
		usuario = document.querySelector('#usuario').value,
		password = document.querySelector("#password").value,
		tipo = document.querySelector("#tipo").value;

		if (email === '' ||  usuario === '' || password === '') {
			swal({
				type: 'error',
				title: 'Error :(',
				text: 'Todos los campos del formulario son obligatorios',
			
			})
		} else {
			// todos los campos son correctos, ajax
			var datos = new FormData();
			datos.append('email', email);
			datos.append('usuario', usuario);
			datos.append('password', password);
			datos.append('accion', tipo);

			// crear el llamado a ajax

			var xhr = new  XMLHttpRequest();
			xhr.open('POST','includes/modelos/modelo-admin.php', true);
			
			xhr.onload = function() {
				if (this.status === 200) {
					var respuesta = JSON.parse(xhr.responseText);
					
					if (respuesta.respuesta === 'correcto') {
						// si es nuevo usuario
						if (respuesta.tipo === 'crear') {
							swal({
								title: 'Usuario Creado',
								text: 'El usuario se creo correctamente',
								type: 'success'
							});
						}
					} else {
						swal({
							title: 'Error',
							text: 'Hubo un error :(',
							type: 'error'
						});
					}

				}
			}

			// enviar peticion
			xhr.send(datos);
		}
}