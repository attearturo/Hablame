var fs = require('fs');
var express = require('express');
var api = express.Router();
const client = require('mongodb').MongoClient;

api.get('/', (req, res) => {
	res.json({message: 'working'});
});

const url = 'mongodb://localhost/hablame';
var db = null;


client.connect(url, (err, database) => {
  if(!err){
   db = database;
   console.log('hablame : Conexión establecida a Mongo Database')
 } else {
  console.log('Error de conexión a Mongo Database')
}
});

api.route('/usuarios')
.get((req,res)=>{
  db.collection('usuarios')
  .find({})
  .toArray((err,usuarios)=>{
    if(!err){
      res.json({ 
        mensaje: 'ok', 
        usuarios: usuarios,
      });
    }else{
      res.json({ mensaje: 'error' });
    }
  });
})

.post((req,res)=>{
  
  db.collection('usuarios')
  .find({codigo:req.body.codigo})
  .toArray((err,usuarios) =>{
    if(!err && usuarios.length == 0){
      var nuevoUsuario={
        universidad: req.body.universidad,
        codigo: req.body.codigo,
        contrasena: req.body.contrasena,
        foto: req.body.foto,
      };
      db.collection('usuarios').insert(nuevoUsuario,(errInsert) => {
        if(!errInsert){
          res.json({ mensaje: 'ok' });
        } else {
          res.json({mensaje:'Lo sentimos, este código ya se utiliza.'});
        }
      });
    } else {
      res.json({ mensaje: 'No se pudo insertar usuario.' });
    }
  });
});

api.route('/idioma')
.post((req, res) => { 
  db.collection('usuarios')
  .update({codigo:req.body.codigo}, {$set: {aprendere: req.body.codigo}})
  .toArray((err, usuarios) => {
    if(!err && usuarios.length > 0){
      res.json({
        mensaje: 'ok',
        usuario: usuarios[0]
      });
    } else {
      res.json({ mensaje: 'Idioma agregago' });
    }
  });
});

api.route('/login')
.post((req, res) => { 
  db.collection('usuarios')
  .find({ codigo:req.body.codigo, contrasena:req.body.contrasena})
  .toArray((err, usuarios) => {
    if(!err && usuarios.length > 0){
      res.json({
        mensaje: 'ok',
        usuario: usuarios[0]
      });
    } else {
      res.json({ mensaje: 'Usuario o contraseña incorrecto' });
    }
  });
});

api.route('gallery/:codigo')
.post((req, res) => {
  if (!req.files){
    return res.json({ mensaje: 'Sin archivo' });
  }
  
  console.log(req.params.codigo, req.body.texto);
  var foto = req.files.foto;
  
  foto.mv(path.join(__dirname, `gallery/${foto.name}`), function(err) {
    if(!err){
      res.json({ mensaje: 'ok' });

      db.collection('usuarios')
      .updateOne({ codigo: req.params.codigo }, { 
        $set: {
          foto: foto.name,
          texto: req.body.texto
        }
      });

    }else{
      res.json({ mensaje: 'error', error: err });
    }
  });
});


module.exports = api;