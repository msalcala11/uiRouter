var express = require('express');
var fs = require('fs');

var app = express();

var foods = { 
			"eggs" : {
				"id": 0,
				"name": "eggs"
			},

			"oatmeal" : {
				"id": 1,
				"name": "oatmeal"
			},

			"bread" : {
				"id": 2,
				"name" : "bread"
			},

			"rice milk": {
				"id": 3,
				"name": "rice milk"
			},
			"chicken": {
				"id": 32,
				"name": "chicken"
			},
			"beets": {
				"id": 456,
				"name": "beets"
			}
};

app.use(express.static(process.env.PWD + '/'));
app.use(express.bodyParser());

app.get('/', function(req, res){
	var buffer = new Buffer(fs.readFileSync("index.html"));
	var indexStr = buffer.toString("utf-8", 0, buffer.length);
	res.send(indexStr);
});

app.get('/list', function(req, res) {
	res.json(foods);
});

app.get('/list/:itemID', function(req, res) {

	var food = foods[req.params.itemID];

	res.json(food);
});

app.post('/list', function(req,res) {
	foods = req.body;
	res.send(200);
	console.log(foods);
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Listening on ' + port);
});
