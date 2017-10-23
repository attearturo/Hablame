var controller = function controller(view, model) {

	if(self.fetch) {
        console.log('Fetch funcionando')
    } else {
       console.log('Error en fetch')
   }

   view.onLogin = (codigo, contrasena) => {
    var params = new URLSearchParams();
    params.set('codigo', codigo);
    params.set('contrasena', contrasena);

    fetch(`${location.origin}/api/login`, {
      method: 'POST',
      body: params
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.mensaje == 'Acceso otorgado'){
        console.log(res);
        view.usuario = res.usuario;
        history.pushState('login', 'Login', '/register');
        view.render();
      }
    });
   };

   view.onRegistro = (codigo, nombre, apellido) => {

    console.log('Se introducen datos en el formulario');
    var params = new URLSearchParams();
    params.set('codigo', codigo);
    params.set('nombre', nombre);
    params.set('apellido', apellido);

    fetch(`http://localhost:3001/api/usuarios`,{
        method: 'POST',
        body: params
    })
    .then(res => res.json())
    .then((res)=> console.log(res));

        //location.pathname = '/login'
};

view.render();
}

// llamamos la función controlador y le pasamos la vista y los datos
controller(view);
