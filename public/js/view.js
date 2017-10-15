var view = {


    renderLogin: function renderLogin(){

     var form = document.createElement('form');
     form.setAttribute('method', 'post');
     form.innerHTML = `
        <img class="logo" src="public/img/logo.png">
        <input id='usern' type="text" name="user" placeholder="código de tu universidad" required="required" />
        <input id='pword' type="password" name="password" placeholder="contraseña" required="required" />
        <button id='entrada' type="submit" class="btn btn-primary btn-block btn-large">Entrar</button>
        <p class="subTexto">¿Eres nuevo? <a class="registro" href="/register">Crear una cuenta</a></p>
        `;

        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            var user = e.target.user.value;
            var data = {
                password: e.target.password.value,
            };
            this.onFormSubmit(user,data);
        });

        return form;
     },

    renderRegister: function renderRegister(){
        div = document.createElement('div');
        div.innerHTML = `
        <img class="logo" src="img/logoWord.png">
        <p class="sub">Aprende idiomas mientras conoces hablantes nativos de forma segura</p>
        <div class="selectorU">
            <div class="drop-menu">
                <div class="select">
                    <span class="desactivado">universidad</span>
                    <i class="fa fa-chevron-down"></i>
                </div>
                <input type="hidden" name="gender">
                <ul class="dropeddown">
                    <li id="male">Icesi</li>
                    <li id="female">Javeriana</li>
                    <li id="female">Autónoma</li>
                </ul>
            </div>
        </div>
        <form method="post">
            <input type="text" name="p" placeholder="código" required="required" />
            <button href="./nombre.html" type="submit" class="btn btn-primary btn-block btn-large">Continuar</button>
        </form>
        <p class="subTexto">¿Ya tienes cuenta? <a class="registro" href="/login">Iniciar sesión</a></p>
    </div>

    <p class="condiciones">Acepto las <a class="registro">Condiciones</a> y la <a class="registro">Privacidad</a> de Habláme</p>
        `;

        return div;
    },


    render: function render() {

        var main = document.getElementById('main');
        main.innerHTML = '';
        switch(location.pathname){

            case '/login':
            main.setAttribute('class', 'backgroundLogin');
            main.appendChild(this.renderLogin());      
            break;

            case '/register':
            main.setAttribute('class', 'backgroundRegister');
            main.appendChild(this.renderRegister());
            break;
        }
    }
};
