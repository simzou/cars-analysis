var filename = "./data/transactions-q1.json";
google.load("visualization", "1.1", {packages:["geochart"]});
google.setOnLoadCallback(main);

// using variable names for indexes
var STATE = 0;
var INVOICE_AMOUNT = 1;
var OLD_CAR_MPG = 2;
var NEW_CAR_MPG = 3;

function main() {
	$.getJSON(filename, function(json) {

		var state_aggregate_data = [];

		var grouped_by_region = _.groupBy(json, function(row) {
			return states[row[STATE]]['region'];
		});

		var pie_data = prepare_data_for_pie_chart(grouped_by_region);

		draw_google_pie_chart("region-pie-chart", pie_data);

		var grouped_by_state = _.groupBy(json, function(row) {
			return states[row[STATE]]['region'];
		})
	})
}

function prepare_data_for_pie_chart(grouped_by_region) {
	data = ["Region", "Transactions"];
	for (region in grouped_by_region) {
		data.push([region, grouped_by_region[region].length])
	}
	return data
}

