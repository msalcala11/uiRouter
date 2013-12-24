var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(process.env.PWD + '/'));

app.get('/', function(req, res){
	var buffer = new Buffer(fs.readFileSync("index.html"));
	var indexStr = buffer.toString("utf-8", 0, buffer.length);
	response.send(indexStr);
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log('Listening on ' + port);
});
