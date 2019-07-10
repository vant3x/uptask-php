eventListeners();

function eventListeners() {
	document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
	e.preventDefault();

	var usuario = document.querySelector('#usuario').value,
		password = document.querySelector("#password").value,
		tipo = document.querySelector("#tipo").value;

		if (document.querySelector('#email')) {
			var email = document.querySelector('#email').value;
		}
	// validar si hay email 
	
		var camposRegistro = email === '' ||  usuario === '' || password === '';
		var camposLogin = usuario === '' || password === '';

		var campos;

		if (document.querySelector('#email')) {
			campos = camposRegistro;
		} else {
			campos = camposLogin;

		}

		if (campos) {
			swal({
				type: 'error',
				title: 'Error :(',
				text: 'Todos los campos del formulario son obligatorios',
			
			})
		} else {
			// todos los campos son correctos, ajax
			if (campos == camposRegistro) {
				var datos = new FormData();
				datos.append('email', email);
				datos.append('usuario', usuario);
				datos.append('password', password);
				datos.append('accion', tipo);
			} else {
				var datos = new FormData();
				datos.append('usuario', usuario);
				datos.append('password', password);
				datos.append('accion', tipo);
			}
			
			

			// crear el llamado a ajax

			var xhr = new  XMLHttpRequest();
			xhr.open('POST','includes/modelos/modelo-admin.php', true);
			
			xhr.onload = function() {
				if (this.status === 200) {
					var respuesta = JSON.parse(xhr.responseText);
                    
                    // console.log(respuesta);
					if (respuesta.respuesta === 'correcto') {
						// si es nuevo usuario
						if (respuesta.tipo === 'crear') {
							swal({
								title: 'Usuario Creado',
								text: 'El usuario se creó con éxito!',
								type: 'success'
							});
						} else if (respuesta.tipo === 'login') {
							setTimeout( () => {
								window.location.href = 'index.php'

							},2400);

							swal({
								title: 'Login Correcto',
								text: 'En un momento te llevaremos a la página de inicio',
								type: 'success',
								confirmButtonText: 'Aceptar'
							}).then(resultado => {
								if (resultado.value) {
									window.location.href = 'index.php'
								}
							})
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