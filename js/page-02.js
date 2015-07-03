var filename = "./data/transactions-q1.json";
google.load("visualization", "1.1", {packages:["geochart", "corechart"]});
google.setOnLoadCallback(main);

// using variable names for indexes
var STATE = 0;
var INVOICE_AMOUNT = 1;
var OLD_CAR_MPG = 2;
var NEW_CAR_MPG = 3;

function main() {
	$.getJSON(filename, function(json) {


		var grouped_by_region = _.groupBy(json, function(row) {
			return states[row[STATE]]['region'];
		});

		var pie_data = prepare_data_for_pie_chart(grouped_by_region);

		draw_google_pie_chart("region-pie-chart", pie_data);

		var grouped_by_state = _.groupBy(json, function(row) {
			return row[STATE];
		});

		var state_aggregate_data = [];

		for (var state in grouped_by_state) {
			var state_data = grouped_by_state[state];
			var processed_data = process_state_data(state_data);

			// adds array of the form 
			// [state_name, state_data_object]
			state_aggregate_data.push([state].concat(processed_data));
		}
		draw_map('region-map', state_aggregate_data, 'transactions');

	})
}

function prepare_data_for_pie_chart(grouped_by_region) {
	data = [["Region", "Transactions"]];
	for (region in grouped_by_region) {
		data.push([region, grouped_by_region[region].length])
	}
	return data;
}

function process_state_data(data) {
	aggregate_data = {
		transactions: data.length
	}
	return aggregate_data;
}
