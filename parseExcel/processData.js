var fs = require("fs");
var xlsx = require('node-xlsx');

console.log("Loading File");
 
var file_data  = fs.readFileSync(__dirname + '/oesm14ma/MSA_M2014_dl.xlsx');

console.log('Parse data');

var obj = xlsx.parse(file_data); // parses a buffer 

data_map = {};
 for(index in obj[0].data){
 	row = obj[0].data[index];

 	if(typeof data_map[row[1]] == 'undefined'){
 		data_map[row[1]] = [];
 		data_map[row[1]].push(obj[0].data[0]);
 	}
 	data_map[row[1]].push(row);
 }

 console.log('Write JSON data to file');

 var outputFilename;
 for(region_id in data_map){
 	 outputFilename = 'output/' + region_id + '.json';

	fs.writeFile(outputFilename, JSON.stringify(data_map[region_id], null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + outputFilename);
	    }
	}); 
 }

console.log("Done");