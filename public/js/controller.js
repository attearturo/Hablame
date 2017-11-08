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
    if(res.mensaje == 'ok'){
      console.log(res);
      view.usuario = res.usuario;
      history.pushState('login', 'registro', '/home');
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
  params.set('foto','predeterminado.jpg');

  fetch(`${location.origin}/api/usuarios`,{
    method: 'POST',
    body: params
  })
  .then(res => res.json())
  .then((res) => {
    if(res.mensaje == 'ok'){
      console.log(res);
      view.usuario = res.usuario;
      history.pushState('registro', 'login', '/idiom');
      view.render();
    } else {
      alert('Este código ya está siendo utilizado.')
    }
  });
};

view.hacerPost = (nombre, foto, post) => {
  console.log('Se introducen datos en el formulario');
  var params = new URLSearchParams();
  params.set('nombre', nombre);
  params.set('foto', foto);
  params.set('post', post);

  fetch(`${location.origin}/api/hacerPost`,{
    method: 'POST',
    body: params
  })
  .then(res => res.json())
  .then((res) => {
    if(res.mensaje == 'ok'){
      console.log(res);
      view.usuario = res.usuario;
      history.pushState('registro', 'login', '/home');
      view.render();
    } else {
      alert('Este código ya está siendo utilizado.')
    }
  });
};

view.onIdiom = (codigo, ensena, aprende) => {
  console.log('Se introducen los idiomas');
  var params = new URLSearchParams();
  params.set('codigo', codigo);
  params.set('ensenare', ensena);
  params.set('aprendere', aprende);

  fetch(`${location.origin}/api/idioma`,{
    method: 'POST',
    body: params
  })
  .then(res => res.json())
  .then((res) => {
    if(res.mensaje == 'ok'){
      console.log(res);
     view.usuario = res.usuario;
     history.pushState('registro', 'login', '/home');
     view.render();
    }
  });
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
    history.pushState('registro', 'login', '/home');
    view.render();
  });
};

view.render();

  fetch(`${location.origin}/api/usuarios`)

  .then((res) => res.json())
  .then((res) => {
    if(res.mensaje == 'ok'){
      view.usuarios = res.usuarios;
      view.render();
    }
  });

  fetch(`${location.origin}/api/posts`)
  .then((res) => res.json())
  .then((res) => {
    if(res.mensaje == 'ok'){
      view.posts = res.posts;
      view.render();
    }
  });
}

controller(view);
