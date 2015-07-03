// processed json file is an array of trimmed car data
// labeling is stripped from the json for file size reduction
// json file is an array of elements
// each element is an array with 4 elements of this format:

// [state, invoice_amount, trade_in_mileage, new_vehicle_car_mileage]

var filename = "../data/transactions-q1.json";

// using variable names for indexes
var STATE = 0;
var INVOICE_AMOUNT = 1;
var OLD_CAR_MPG = 2;
var NEW_CAR_MPG = 3;

google.load("visualization", "1.1", {packages:["bar", "geochart", "corechart"]});
google.setOnLoadCallback(main);

function main() {
	$.getJSON(filename, function(json) {

		var state_aggregate_data = [];


		var grouped_by_state = _.groupBy(json, function(row) {
			return row[STATE];
		})
		for (var state in grouped_by_state) {
			var state_data = grouped_by_state[state];
			var processed_data = process_state_data(state_data);

			// adds array of the form 
			// [state_name, state_data_object]
			state_aggregate_data.push([state].concat(processed_data));
		}

		use_aggregate_data(state_aggregate_data, 'cost_per_mpg');
		use_aggregate_data(state_aggregate_data, 'percent');
		draw_map('regions_div', state_aggregate_data, 'cost_per_mpg')
	})
}

function use_aggregate_data(state_aggregate_data, param) {
	state_aggregate_data = _.sortBy(state_aggregate_data, function (datum) {
		return datum[1][param];
	});
	var top_10_states = _.first(state_aggregate_data,10)
	var bottom_10_states = _.last(state_aggregate_data,10)
	bottom_10_states.reverse();
	draw_google_bar_chart("top10" + param, top_10_states, param);
	draw_google_bar_chart("bottom10" + param, bottom_10_states, param);
	// console.log(state_aggregate_data);
	// console.log(top_10_states);
	// console.log(bottom_10_states);
}

// expects array of arrays
// returns object with following keys and associated values:
// percent - percent improvement in mpg 
// percent_display - percent formatted nicely
// cost_per_mpg - total cost (invoice amounts) divided by improvement in mpg
// cost_display - cost_per_mpg formatted nicely

function process_state_data(data) {
	var old_mpg_sum = 0;
	var new_mpg_sum = 0;
	var cost = 0;

	var aggregate_data = {};
	_.each(data, function (datum) {
		old_mpg_sum += Number.parseInt(datum[OLD_CAR_MPG]);
		new_mpg_sum += Number.parseInt(datum[NEW_CAR_MPG]);
		cost += Number.parseInt(datum[INVOICE_AMOUNT]);
	});

	var mpg_difference = new_mpg_sum - old_mpg_sum; 
	var percentage_improvement = mpg_difference / old_mpg_sum;
	var cost_per_mpg = cost / mpg_difference;

	aggregate_data = {
		percent: percentage_improvement,
		percent_display: format_percent(percentage_improvement),
		cost_per_mpg: cost_per_mpg,
		cost_display: format_money(cost_per_mpg)
	}
	return aggregate_data;
}

function format_percent(decimal) {
	return (decimal * 100).toFixed(2) + '%';
}

// code taken from: 
// http://stackoverflow.com/a/14428340
function format_money(amount) {
	return "$" + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function format_number(amount) {
	return amount.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}