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
        aprendere : "Pendiente",
        ensenare : "Pendiente",
        post : ["Primera pregunta", "Descripción", "Tiempo", "predeterminado.jpg"],
      };
      
      db.collection('usuarios').insert(nuevoUsuario,(errInsert) => {
        if(!errInsert){
          res.json({ 
            mensaje: 'ok',
            usuario: nuevoUsuario
          });
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
  .update({codigo:req.body.codigo}, {$set: {aprendere: req.body.aprendere, ensenare: req.body.ensenare}});
  
  db.collection('usuarios')
  .find({ codigo:req.body.codigo })
  .toArray((err, usuarios) => {
    if(!err && usuarios.length > 0){
      res.json({
        mensaje: 'ok',
        usuario: usuarios[0]
      });
    } else {
      res.json({ mensaje: 'Error en idiomas' });
    }
  });
});


api.route('/hacerPost')
.post((req,res)=>{
  db.collection('usuarios')
  .find({ nombre:req.body.nombre, foto:req.body.foto, post:req.body.post})
  .toArray((err,usuarios) =>{
    if(!err && usuarios.length == 0){
      var nuevoUsuario={
        nombre: req.body.nombre,
        universidad: req.body.universidad,
        codigo: "Pendiente",
        contrasena: req.body.contrasena,
        foto: req.body.foto,
        aprendere : "Pendiente",
        ensenare : "Pendiente",
        post : req.body.foto,
        post : ["Primera pregunta", "Descripción", "Tiempo", "predeterminado.jpg"],
      };
      
      db.collection('usuarios').insert(nuevoUsuario,(errInsert) => {
        if(!errInsert){
          res.json({ 
            mensaje: 'ok',
            usuario: nuevoUsuario
          });
        } else {
          res.json({mensaje:'Lo sentimos, este código ya se utiliza.'});
        }
      });
    } else {
      res.json({ mensaje: 'No se pudo insertar usuario.' });
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
          foto: req.body.foto,
          texto: req.body.texto
        }
      });

    }else{
      res.json({ mensaje: 'error', error: err });
    }
  });
});


api.route('/posts')
.get((req,res)=>{
  db.collection('posts')
  .find({})
  .toArray((err,posts)=>{
    if(!err){
      res.json({ 
        mensaje: 'ok', 
        posts: posts,
      });
    }else{
      res.json({ mensaje: 'error' });
    }
  });
})

.post((req,res)=>{
  db.collection('posts')
  .find({codigo:req.body.codigo})
  .toArray((err,posts) =>{
    if(!err && usuarios.length == 0){
      var nuevoPost={
        post: req.body.post,
        texto: req.body.texto,
        foto: req.body.foto,
        ubicacion: req.body.ubicacion,
        like: req.body.like,
      };
      db.collection('posts').insert(nuevoPost,(errInsert) => {
        if(!errInsert){
          res.json({ mensaje: 'ok' });
        } else {
          res.json({mensaje:'No se pudo crear post.'});
        }
      });
    } else {
      res.json({ mensaje: 'No se pudo crear post.' });
    }
  });
});

module.exports = api;