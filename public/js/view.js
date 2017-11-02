var view = {
  usuario: null,
  usuarios:null,


activarDesplegable: function activarDesplegable(){
      $('.drop-menu').click(function() {
            $(this).attr('tabindex', 1).focus();
            $(this).toggleClass('active');
            $(this).find('.dropeddown').slideToggle(300);
            console.log("Funciona desplegable")
        });
        $('.drop-menu').focusout(function() {
            $(this).removeClass('active');
            $(this).find('.dropeddown').slideUp(300);
        });
        $('.drop-menu .dropeddown li').click(function() {
            $(this).parents('.drop-menu').find('span').text($(this).text());
            $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
        });
    },

    renderLogin: function renderLogin(){

       var form = document.createElement('form');
       form.setAttribute('method', 'post');
       form.innerHTML = `
           <div class='bodyLogin'>
       <div class='login'>
           <img class="logo" src="public/img/logo.png">
           <input id='usern' type="text" name="user" placeholder="código de tu universidad" required="required" />
           <input id='pword' type="password" name="password" placeholder="contraseña" required="required" />
           <button id='entrada' type="submit" class="btnLogin btnLogin-primary btnLogin-block btnLogin-large">Entrar</button>
           <p class="subTexto">¿Eres nuevo? <a class="registro" href="/register">Crear una cuenta</a></p>
       </div>
   </div>
       `;

       form.addEventListener('submit', (e) =>{
        e.preventDefault();
        console.log('Presiona boton');
        this.onLogin(e.target.user.value, e.target.password.value);
    });
       return form;
   },

    renderRegister: function renderRegister(){
        div = document.createElement('div');
        div.innerHTML = `
        <div class='bodyRegister'>
        <div class='register'>
            <img class="logo" src="public/img/logoWord.png">
            <p class="sub">Aprende idiomas mientras conoces hablantes nativos de forma segura</p>
            <div class="selectorU">
                <div class="drop-menu">
                    <div class="select">
                        <span class="desactivado">universidad</span>
                        <i class="fa fa-chevron-down"></i>
                    </div>
                    <input type="hidden" name="universidad">
                    <ul class="dropeddown">
                        <li id="male">Icesi</li>
                        <li id="female">Javeriana</li>
                        <li id="female">Autónoma</li>
                    </ul>
                </div>
            </div>
            <form method="post">
                <input type="text" name="codigo" placeholder="código" required="required" />
                <input type="password" name="contrasena" placeholder="contraseña" required="required" />
                <button type="submit" class="btnRegister btnRegister-primary btnRegister-block btnRegister-large">Continuar</button>
            </form>
            <p class="subTexto">¿Ya tienes cuenta? <a class="registro" href="/login">Iniciar sesión</a></p>
            <p class="condiciones">Acepto las <a class="registro">Condiciones</a> y la <a class="registro">Privacidad</a> de Habláme</p>
          </div>
        </div>
        `;

        div.querySelector('form').addEventListener('submit', (e) => {
          e.preventDefault();
          var universidad = div.querySelector('.desactivado').innerHTML;
          console.log(universidad);
          this.onRegistro(universidad, e.target.codigo.value, e.target.contrasena.value);
        });
        return div;
    },

    renderIdiom: function renderIdiom(){
        div = document.createElement('div');
        div.innerHTML = `
        <div class='bodyRegister'>
        <div class='register'>
        <p class="escogerIdioma">Indica el idioma que quieres <e class="azul">aprender</e> y el que puedes
            <e class="verde">enseñar</e>
        </p>

        <div class="selectorU">
            <div class="drop-menu">
                <div class="select">
                    <span class="ensena">aprenderé</span>
                    <i class="fa fa-chevron-down"></i>
                </div>
                <input type="hidden" name="ensenare">
                <ul class="dropeddown">
                    <li id="ingles">Inglés</li>
                    <li id="aleman">Aleman</li>
                    <li id="frances">Frances</li>
                </ul>
            </div>
        </div>
        <div class="selectorU">
            <div class="drop-menu">
                <div class="select">
                    <span class="aprende">enseñaré</span>
                    <i class="fa fa-chevron-down"></i>
                </div>
                <input type="hidden" name="aprendere">
                <ul class="dropeddown">
                    <li id="español">Español</li>
                    <li id="ingles">Ingles</li>
                    <li id="frances">Frances</li>
                </ul>
            </div>
        </div>
        <form method="post">
            <button type="submit" class="btnRegister btnRegister-primary btnRegister-block btnRegister-large">Continuar</button>
        </form>
        <p class="subTexto">Lo puedes modificar luego</p>
    </div>

    <p class="progreso">
    <img class="ciclaR"src="public/img/cicla.png">
    <img class="linea" src="public/img/line.png"></p>
    </div>
        `;

        div.querySelector('form').addEventListener('submit', (e) => {
          e.preventDefault();
          var ensena = div.querySelector('.ensena').innerHTML;
          var aprende = div.querySelector('.aprende').innerHTML;
          this.onIdiom(ensena, aprende);
        });
        return div;
    },

  renderProfile: function renderProfile(){
    var div = document.createElement('div');

    div.innerHTML = `
      <h1>${this.usuario.codigo}</h1>
    `;

    if(this.usuario.foto){
      div.innerHTML += `
        <img src="fotos/${this.usuario.foto}" />
        <p>${this.usuario.texto}</p>
      `;
    } else {
      div.innerHTML += `
        <form>
          <input type="file" name="foto" />
          <textarea name="texto"></textarea>
          <button type="submit">subir</submit>
        </form>
      `;

      div.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.onSubirFoto(this.usuario.codigo, e.target.foto.files[0], e.target.texto.value);
      });
    }
    return div;
  },


  preguntaIndividual: function preguntaIndividual(){

div = document.createElement('div');
this.usuarios.sort((a, b) => a.codigo < b.codigo).forEach(user => {
div.innerHTML += `
<div class="col-lg-8 col-md-8">
    <div class="card card-stats">
        <div class="card-gallery" data-background-color="" style='background-image: url("public/gallery/${user.post[3] ? user.post[3] : "predeterminado.jpg"}")'>
            <i class="material-icons"></i>
        </div>

        <div class="card-content">
             <div class="card-header" data-background-color="" style='background-image: url("public/gallery/${user.foto ? user.foto : "predeterminado.jpg"}")'>
                <i class="material-icons">person</i>
            </div>
            <p class="category">
                <Strong>${user.nombre}</Strong>
            </p>
            <h3 class="title"><a href="#">${user.post[0] ? user.post[0] : ""}</a></h3>
            <p class="category">${user.post[1] ? user.post[1] : ""}</p>
        </div>

        <div class="card-footer">
            <div class="izquierda">
                <div class="state">
                    <a href="#">
                        <i class="material-icons">favorite_border</i> Me gusta</a>
                    </div>
                    <div class="state">
                        <a href="#"><i class="material-icons">chat_bubble_outline</i> Comentarios</a>
                    </div>
                </div>

                <div class="derecha">
                    <div class="stats">
                        <i class="material-icons">location_on</i> Universidad ${user.universidad}
                    </div>
                    <div class="stats">
                        <i class="material-icons">date_range</i> Hace ${user.post[2] ? user.post[2] : ""}
                    </div>
                </div>
            </div>
            <div class="card-comentarios">
                <div class="comentarioHecho">
                    <div class="card-header" style='background-image: url("public/gallery/${user.foto}")' data-background-color="">
                        <i class="material-icons">person</i>
                    </div>
                    <h4 class="title">Otro usuario</h4>
                    <p class="category">Was fúr ein Gericht its das und wo kann ich ihn finden?</p>

                </div>
                <div class="hacerComentario">
                    <div class="card-header" data-background-color="">
                        <i class="material-icons">person</i>
                    </div>
                    <form>
                        <input type="text" name="comentar" placeholder="Escribe un comentario...">
                    </form>
                </div>
            </div>
        </div>
        </div>
        `;
        });
        return div;
    },

 renderHome: function renderHome(){
    div = document.createElement('div');
    if(!this.usuario){
         location.pathname = '/login'
    } else {
        div.innerHTML += `
    <div class="col-lg-2">
    </div>
    <div class="wrapper col-lg-8 col-md-offset-3w">

        <div class="sidebar col-lg-3 col-md-3" data-color="blue" data-image="public/img/sidebar-3.jpg">
            <div class="logo">
                <img class="simple-text" src="public/img/logo.png">
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                    <li class="active">
                        <a href="/home">
                            <i class="material-icons">public</i>
                            <p>Todas las preguntas</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="material-icons">import_contacts</i>
                            <p>Aprender ${this.usuario.aprendere}</p>
                        </a>
                    </li>
                    <li>
                        <a href=".#">
                            <i class="material-icons">school</i>
                            <p>Enseñar ${this.usuario.ensenare}</p>
                        </a>
                    </li>
                    <li>
                        <form class="crearPost">
                          <textarea class="introducirTexto" name="texto" placeholder="¿Qué quieres preguntar?"></textarea>
                          <input class="introducirImagen" type="file" name="foto" />
                          <button type="submit"><i class="material-icons text-gray">add_box</i>
                          CREAR PREGUNTA</button>
                        </form>  
                    </li>
                    <li>  
                        <a href="/login">       
                            <i class="material-icons text-gray">add_out</i>
                            <p>Salir</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="main-panel col-lg-9 col-md-9">

            <nav class="navbar navbar-transparent navbar-absolute">
                <div class="container-fluid">

                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Tablero de preguntas
                        </a>
                        <form class="navbar-form navbar-right" role="search">

                            <div class="form-group is-empty">
                                <input type="text" class="form-control" placeholder="Buscar">
                            </div>
                        </form>
                    </div>

                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav navbar-right">

                            <li>
                                <a href="pablo" class="dropdown-toggle me" data-toggle="dropdown" style='background-image: url("public/gallery/${this.usuario.foto}")'>
                                    <i class="material-icons">person</i>
                                    <p class="hidden-lg hidden-md">Perfil</p>
                                </a>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="material-icons">notifications</i>
                                    <span class="notification">5</span>
                                    <p class="hidden-lg hidden-md">Notificaciones</p>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#">Mike John responded to your email</a>
                                    </li>
                                    <li>
                                        <a href="#">You have 5 new tasks</a>
                                    </li>
                                    <li>
                                        <a href="#">You're now friend with Andrew</a>
                                    </li>
                                    <li>
                                        <a href="#">Another Notification</a>
                                    </li>
                                    <li>
                                        <a href="#">Another One</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="./notifications.html" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="material-icons">message</i>
                                    <p class="hidden-lg hidden-md">Chat</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="content">
                <div class="container-fluid">
                    <div class="row contenedorPreguntas">

                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

    div.querySelector('.contenedorPreguntas').appendChild(this.preguntaIndividual());

    console.log(div.querySelector('.crearPost'))
      div.querySelector('.crearPost').addEventListener('submit', (e) => {
        e.preventDefault();
        this.onSubirFoto(this.usuario.codigo, e.target.foto.files[0], e.target.texto.value);
      });

  }

    return div;
  },


    render: function render() {

        var main = document.getElementById('main');
        main.innerHTML = '';
        switch(location.pathname){

            default:
            main.appendChild(this.renderLogin());   
            break;

            case '/login':
            main.appendChild(this.renderLogin());      
            break;

            case '/register':
            main.appendChild(this.renderRegister());
            break;

            case '/idiom':
            main.appendChild(this.renderIdiom());
            break;

            case '/home':
            main.appendChild(this.renderHome());
            break;

            case '/profile':
            main.appendChild(this.renderProfile());
            break;
        }
        this.activarDesplegable();
    }
};
