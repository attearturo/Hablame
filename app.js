// importamos el módulo express
const express = require('express');
// creamos la variable app 
var app = express();
// requerimos el módulo path
// viene por defecto en node, no debemos instalarlo
var path = require('path');
//modulo mongoose en vez de body-parser
var mongoose = require('mongoose');

//var api = require('./api.js');


//renderizacion del lado del cliente
mongoose.connect('mongodb://localhost/pruebaHablame', {
useMongoClient: true,
});

// definimos las carpetas de archivos estáticos
app.use('/public', express.static('public'));


// definimos el comportamiento del root
app.get('*', (request, response) => {
  // enviamos el archivo index.html
  response.sendFile(path.join(__dirname, 'public/index.html'));
});


// iniciamos el servidor en el puerto 3000
app.listen(3001, function () {
  console.log('Escuchando en el puerto 3001')
});