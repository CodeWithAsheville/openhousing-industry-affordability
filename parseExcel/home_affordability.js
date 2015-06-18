// New Stuff
var home_for_sale_total_units = 715;
var home_for_sale_stats = 
					[
						[0, 100000, 22],
						[100000, 199999, 178],
						[200000, 299999, 146],
						[300000, 399999, 106],
						[400000, 499999, 65],
						[500000, 1500000, 198]
					];


var total_household_income_stats = [
	[0, 15000, 7403],
	[15000, 24999, 4887],
	[25000, 34999, 5091],
	[35000, 49999, 6234],
	[50000, 74999, 7462],
	[75000, 99999, 3799],
	[100000, 149999, 3508],
	[1500000, 1000000, 2120]
]


var affordable_home_income_multiplier = 3;
function get_income_group_affordable_width(income){
	max_affordable = income * affordable_home_income_multiplier;
	console.log("MAX AFFORDABLE" + income + ": " + max_affordable);

	width = 0;
	for(index in home_for_sale_stats){
		row = home_for_sale_stats[index];

		console.log("testing: " + max_affordable + " : " + row[1]); 
		if(max_affordable > row[1]){
			console.log("hit full");
			width += parseFloat(row[3]);
			// console.log(width);
		}
		else if(max_affordable > row[0]){
			section_range = row[1] - row[0];
			adjusted_max_in_range = max_affordable - row[0];

			section_percentage = adjusted_max_in_range / section_range;
			// console.log(section_percentage);
			width += parseFloat(row[3] * section_percentage);
		}
	}
	width *= 100;
	width = parseFloat(width.toFixed(2));
	// console.log(width);
	return width;
}

var total_household_incomes = 40504;
// End New Stuff

for(row in home_for_sale_stats){
	home_for_sale_stats[row][3] = parseFloat(home_for_sale_stats[row][2] / home_for_sale_total_units).toFixed(2);
}

console.log(home_for_sale_stats);

for(row in total_household_income_stats){
	total_household_income_stats[row][3] = parseFloat(total_household_income_stats[row][2] / total_household_incomes).toFixed(2);
	total_household_income_stats[row][4] = get_income_group_affordable_width(total_household_income_stats[row][0]);


}

// console.log(total_household_income_stats);