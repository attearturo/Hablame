var fs = require('fs');
var express = require('express');
var api = express.Router();

api.get('/', (req, res) => {
	res.json({message: 'working'});
});

	var database = {
		yo: {
			codigo: 2,
   			nombre: "Arcade Fire - Everything Now LP",
   			imagen: "vinilos/Arcade Fire - Everything Now LP.jpg",
   			codigo: 2016,
   			contrasena: 22,
   			universidad: "javeriana",
   			aprende: "POP",
   			ensena: "VINILO",
			notas: []
		},

		personas: {}
	};

	
fs.readFile('database.json', 'utf8', (err, data) => !err && (database = JSON.parse(data)));
save = () => fs.writeFile('database.json', JSON.stringify(database), 'utf8');

	api.route('/yo')
	
		.get((req, res) => {
		res.send(database.yo);
		});

		.post((req, res)) => {
		database.yo.notas.push({
			materia:req.body,materia,
			nota: req.body.nota,
		});

		res.send({ message: 'ok'});
		};

	api.route('/personas')
		.get((req, res) => {
		res.send(database.personas);
	})
	.post((req, res) => {
		database.personas[req.body.id] = {
			nombre: request.body.nombre,
			universidad: request.body.universidad,
			notas: []
		};
		save():
	})
		res.send({message: 'ok'});
  });

api.route('/personas/:id')
  .get((req, res) => {
    res.send(database.personas[req.params.id]);
  });

api.route('/personas/:id/universidad')
  .post((req, res) => {
    database.personas[req.params.id].notas.push({
      universidad: req.body.universidad,
      nota: req.body.nota,
    });
    save();

    res.send({ message: 'ok' });
  })

module.exports = api;