var controller = function controller(view, model) {

	if(self.fetch) {
        console.log('Fetch funcionando')
    } else {
       console.log('Error en fetch')
   }


   view.onLogin = (codigo, contrasena) => {
    var parametros = new URLSearchParams();
    parametros.set('codigo', codigo);
    parametros.set('contrasena', contrasena);
    console.log('Error en fetch')

    fetch(`${location.origin}/api/login`, {
      method: 'POST',
      body: parametros
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.mensaje == 'Acceso otorgado'){
        console.log(res);
        view.usuario = res.usuario;
        location.pathname = '/register'
      }
    });
   };


   view.onRegistro = (codigo, nombre, apellido) => {

    console.log('Se introducen datos en el formulario');
    var parametros = new URLSearchParams();
    parametros.set('codigo', codigo);
    parametros.set('nombre', nombre);
    parametros.set('apellido', apellido);
    //parametros.set('apellido', input.value);

    fetch(`http://localhost:3001/api/usuarios`,{
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
