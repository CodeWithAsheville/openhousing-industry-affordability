var fs = require("fs");

console.log("Fetch File List");
 
 path = 'output';

 fs.readdir(path, readRegionFile);

var income_levels = {
						1: [0, 	20000],
						2: [20001, 34999],
						3: [35000, 49999],
						4: [50000, 74999],
						5: [75000, 1000000]
					};

					

var a_mean_index = 11;
var occ_group_index = 5;
var jobs_1000_index = 8;
var occ_title_index = 4;
var area_name_index = 2;


function parseRegionFile(err, data){
	if(err){
		console.log(err);
		return;
	}
	json_data = JSON.parse(data);

	console.log("\n" + json_data[1][1] + " - " + json_data[1][2]);
	detailed_items = [];
	json_data.map(function(row){
		if(row[occ_group_index] == "detailed"){
			detailed_items.push(row)
		}
	});

	groups = {};
	detailed_items.map(function(row){
		for(income_level_id in income_levels){
			income_level = income_levels[income_level_id];

			if(	row[a_mean_index] >= income_level[0] &&
				row[a_mean_index] <= income_level[1] 
				){

				if(typeof groups[income_level_id] == 'undefined'){
					groups[income_level_id] = [];
				}
				groups[income_level_id].push(row);
				break;
			}
		}
	});

	group_sum = {};

	for(group_id in groups){
		if(typeof group_sum[group_id] == 'undefined'){
			group_sum[group_id] = 0.0;
		}

		groups[group_id].map(function(row){
			job_num = parseFloat(row[jobs_1000_index] / 10);
			if(job_num > 0){
				group_sum[group_id] += job_num;
			}
			else{
				row[jobs_1000_index] = 0;
			}
		});

	}

	group_jobs = {};

	for(group_id in groups){
		if(typeof group_jobs[group_id] == 'undefined'){
			group_jobs[group_id] = [];
		}

		groups[group_id].map(function(row){
			group_jobs[group_id].push({'title' : row[occ_title_index], 'share' : row[jobs_1000_index]});
		});

	}

	for(group_id in group_jobs){
		group_jobs[group_id].sort(function(a, b){
			return parseFloat(b.share) - parseFloat(a.share);
		});
	}




	group_output = {};
	for(group_id in group_jobs){ 
		group_output[group_id] = {
									'group_percentage': group_sum[group_id].toFixed(1), 
									// 'group_jobs' : group_jobs[group_id],
									'affordable_rent' : (((income_levels[group_id][0]+income_levels[group_id][1]) / 2) * .30 / 12).toFixed(0)
								};
	}

	console.log(group_output);
}

function readRegionFile(err, files){
	console.log(files);
	// Override = 
	// files = ["11700.json"];

	var output_data = {};
	files.map(function(file){
		// console.log(__dirname + "/" + path + '/' + file);
		var file_data  = fs.readFile(__dirname + "/" + path + '/' + file , parseRegionFile);


	});

}

console.log("Done");