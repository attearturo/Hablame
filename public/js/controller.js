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
        history.pushState('login', 'registro', '/idiom');
        view.render();
      }
    });
  };

  view.onRegistro = (universidad, codigo, contrasena) => {

    console.log('Se introducen datos en el formulario');
    var params = new URLSearchParams();
    params.set('universidad', universidad);
    params.set('codigo', codigo);
    params.set('contrasena', contrasena);

    fetch(`${location.origin}/api/usuarios`,{
      method: 'POST',
      body: params
    })
    .then(res => res.json())
    .then((res)=> console.log(res));

    history.pushState('registro', 'login', '/login');
    view.render();

          //location.pathname = '/login'
        };

        view.onSubirFoto = (codigo, foto, texto) => {
          var params = new FormData();
          params.set('foto', foto);
          params.set('texto', texto);

          fetch(`${location.origin}/api/gallery/${codigo}`, {
            method: 'POST',
            body: params
          })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            view.render();
          });
        };

  view.render();
}

// llamamos la función controlador y le pasamos la vista y los datos
controller(view);
