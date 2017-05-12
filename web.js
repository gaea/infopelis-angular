var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
//app.use(express.static(__dirname + "/app"));

console.log("dirname: " + __dirname);

app.get('/', function(req, res){
	res.sendfile('index.html', {root: __dirname })
});

app.listen(process.env.PORT || 5000);
