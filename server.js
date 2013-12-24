var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(process.env.PWD + '/'));

app.get('/', function(req, res){
	var buffer = new Buffer(fs.readFileSync("index.html"));
	var indexStr = buffer.toString("utf-8", 0, buffer.length);
	res.send(indexStr);
});

app.get('/foods', function(req, res) {
	res.json({ 
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
		});
})

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Listening on ' + port);
});
