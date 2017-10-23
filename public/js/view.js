var view = {


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
                <button href="/nombre" type="submit" class="btnRegister btnRegister-primary btnRegister-block btnRegister-large">Continuar</button>
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
        <div class="login">
        <p class="escogerIdioma">Indica el idioma que quieres <e class="azul">aprender</e> y el que puedes
            <e class="verde">enseñar</e>
        </p>

        <div class="selectorU">
            <div class="drop-menu">
                <div class="select">
                    <span class="desactivado">aprenderé</span>
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
                    <span class="desactivado">enseñaré</span>
                    <i class="fa fa-chevron-down"></i>
                </div>
                <input type="hidden" name="aprendere

                ">
                <ul class="dropeddown">
                    <li id="español">Español</li>
                    <li id="ingles">Ingles</li>
                    <li id="frances">Frances</li>
                </ul>
            </div>
        </div>
        <form method="post">
            <button href="./idiom.html" type="submit" class="btn btn-primary btn-block btn-large">Continuar</button>
        </form>
        <p class="subTexto">Lo puedes modificar luego</p>
    </div>

    <p class="progreso">
    <img class="ciclaR"src="img/cicla.png">
    <img class="linea" src="img/line.png"></p>
        `;

        var universidad = div.querySelector('.desactivado');
          console.log(universidad);

        div.querySelector('form').addEventListener('submit', (e) => {
          e.preventDefault();
          var universidad = this.querySelector('.desactivado').innerHTML;
          console.log(universidad);
          this.onRegistro(universidad, e.target.codigo.value, e.target.contrasena.value);
        });

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
        }
    }
};
