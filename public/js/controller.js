var controller = function controller(view, model) {

	if(self.fetch) {
    console.log('Fetch funcionando')
		} else {
     console.log('Error en fetch')
	}

	view.onFormSubmit = (email, nombre, apellido) => {

    console.log('Se introducen datos en el formulario');
    var parametros = new URLSearchParams();
    parametros.set('email', 'gomez@hotmail.com');
    parametros.set('nombre', 'Carlos');
    parametros.set('apellido', 'Pepito');
    //parametros.set('apellido', input.value);

    fetch(`http://localhost:3001/api/crearusuarios`,{
    method: 'POST',
    body: parametros
    })

    .then(res => res.json())
    .then((res)=> console.log(res));
  };

  view.render();
    // llamamos a setHeaderEvents
}

// llamamos la función controlador y le pasamos la vista y los datos
controller(view);
