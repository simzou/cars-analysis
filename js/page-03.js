var filename = "./data/transactions-q3.json";
google.load("visualization", "1.1", {packages:["geochart", "bar"]});
google.setOnLoadCallback(main);

// using variable names for indexes
var OLD_YEAR = 0;
var ODOMETER = 1;
var OLD_MAKE = 2;
var NEW_MAKE = 3;
var STATE = 4;

function main() {
	$.getJSON(filename, function(json) {

		var grouped_by_year = _.groupBy(json, function(row) {
			return row[OLD_YEAR];
		});
		var bar_data1 = prepare_data_for_bar_chart(grouped_by_year, "Year");
		draw_google_bar_chart("year-bar-chart", bar_data1);


		var grouped_by_odometer = _.groupBy(json, function(row) {
			return determine_odometer_bucket(row[ODOMETER]);
		});
		var bar_data2 = prepare_data_for_bar_chart(grouped_by_odometer, "Odometer");
		draw_google_bar_chart("odometer-bar-chart", bar_data2);
	})
}

function prepare_data_for_bar_chart(grouped_by_key, label) {
	var first = [[label, "Transactions"]];
	var data = []
	for (key in grouped_by_key) {
		data.push([key, grouped_by_key[key].length])
	}

	data = _.sortBy(data, function(datum) {
		return parseInt(datum[0].split('-')[0]);
	})

	data = first.concat(data);
	return data;
}

function prepare_data_for_histogram(data) {
	hist_data = [["Label", "Odometer"]];
	for (datum in data) {
		hist_data.push(["Something", datum[ODOMETER]]);
	}
	return hist_data
}

function process_state_data(data) {
	aggregate_data = {
		transactions: data.length
	}
	return aggregate_data;
}

function determine_odometer_bucket(miles) {
	if (miles >= 300000) return "300000+";
	var bucket_size = 50000;
	var rounded = Math.floor(miles/bucket_size) * bucket_size;
	return rounded + " - " + (rounded + bucket_size);
}