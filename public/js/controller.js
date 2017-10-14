var controller = function controller(view, modelo) {

	vista.onFormSubmit = (id, datos) =>{

		var params = new URLSearchParams();
		Object.keys(datos).forEach(key => {
		params.set(key, datos[key]);
		});

		fetch(`http://localhost:3001/api/usuarios/${id}/notas`,{
			method: 'POST',
			body: params
		})

		.then((response) => response.json())
		.then((response) => console.log(response))
	};

    // render inicial con todos los libros
    view.render();
    // llamamos a setHeaderEvents
}

// llamamos la función controlador y le pasamos la vista y los datos
controller(view);
