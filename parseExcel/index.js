// This is kind of redundant at this point with the ruby script
// Check out the processData file, which is actually more useful

// Core Libraries
var fs = require('fs');
var request = require('request');
var express = require('express');
var app = express();

var path = require('path');

// Application variables

var income_levels = {
						1: [0, 	20000],
						2: [20001, 34999],
						3: [35000, 49999],
						4: [50000, 74999],
						5: [75000, 1000000]
					};


// Typical Express Stuff
app.set('port', (process.env.PORT || 3000));

var http = require('http').Server(app);

// app.use('/img',express.static(path.join(__dirname, 'img')));


app.get('/filteredJSONdata/:region_id', function(req, res){
	var region_id = req.param("region_id")
	var file_data  = fs.readFileSync(__dirname + '/output/' + region_id + '.json');
    res.setHeader('Content-Type', 'application/json');

	res.send(file_data);
});


app.get('/houseStats/:region_id', function(req, res){
	  // res.send("tagId is set to " + req.param("region_id"));
	var region_id = req.param("region_id")
	var file_data  = fs.readFileSync(__dirname + '/output/' + region_id + '.json');

console.log(income_levels);
	console.log(file_data);

	  //   res.setHeader('Content-Type', 'application/json');

	  // res.send(file_data);
});


http.listen( (process.env.PORT || 3000), function(){
  console.log('listening on *:'+  (process.env.PORT || 3000) );
});

