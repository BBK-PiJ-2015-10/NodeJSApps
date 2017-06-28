	var express = require('express');

	var app = express();

	var mongojs = require('mongojs');

	var db = mongojs('contactlist',['contactlist']);
	
	var bodyParser = require('body-parser'); 

	app.use(express.static(__dirname + "/public"));
	
	app.use(bodyParser.json());

	app.get('/contactlist', function(req, res){
		console.log("I received a GET request");
		
		db.contactlist.find(function(err, docs){
			console.log(docs);
			//This send the data back to the controller
			res.json(docs);
		});
		
			
	});

	app.post('/contactlist',function(req, res){
		console.log(req.body);
		//Inserts into the database and sends it back to the controller
		db.contactlist.insert(req.body,function(error,doc){
			res.json(doc);
		});
	});
	
	app.delete('/contactlist/:id',function(req, res){
		var id = req.params.id;
		console.log(id);
		//Delete from the mongo database
		db.contactlist.remove({_id: mongojs.ObjectId(id), function(err, doc){
			res.json(doc);
			}
		});
	});
	
	app.get('/contactlist/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
		db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		});	
	});
	
	
	app.put('/contactlist/:id', function(req, res){
		var id = req.params.id;
		console.log(req.body.name);
		db.contactlist.findAndModify({
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number, tel: req.body.tel}},
			new: true},
			function(err, doc){
				res.json(doc);
			}
		);
	});
	

	app.listen(3000);
	console.log("Server running on port 3000");