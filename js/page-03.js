var filename = "./data/transactions-q3.json";
google.load("visualization", "1.1", {packages:["geochart", "bar"]});
google.setOnLoadCallback(main);

// using variable names for indexes
var OLD_YEAR = 0;
var ODOMETER = 1;
var OLD_MAKE = 2;
var NEW_MAKE = 3;
var MSRP = 4;
var STATE = 5;

function main() {
	$.getJSON(filename, function(json) {

		var grouped_by_year = _.groupBy(json, function(row) {
			return row[OLD_YEAR];
		});
		var bar_data1 = prepare_data_for_bar_chart(grouped_by_year, "Year");
		draw_google_bar_chart("year-bar-chart", bar_data1);


		var grouped_by_odometer = _.groupBy(json, function(row) {
			return determine_bucket(row[ODOMETER], 50000, 300000);
		});
		var bar_data2 = prepare_data_for_bar_chart(grouped_by_odometer, "Odometer");
		draw_google_bar_chart("odometer-bar-chart", bar_data2);

		var grouped_by_price = _.groupBy(json, function(row) {
			return determine_bucket(row[MSRP], 5000, 40000);
		});
		var bar_data3 = prepare_data_for_bar_chart(grouped_by_price, "Price");
		draw_google_bar_chart("price-bar-chart", bar_data3);

		var grouped_by_state = _.groupBy(json, function(row) {
			return row[STATE];
		});

		var grouped_by_make = _.groupBy(json, function(row) {
			return row[OLD_MAKE];
		});
		var bar_data4 = prepare_data_for_switch_bar_chart(grouped_by_make);
		draw_google_bar_chart("loyalty-bar-chart", bar_data4);

		var state_aggregate_data = [];

		for (var state in grouped_by_state) {
			var state_data = grouped_by_state[state];
			var processed_data = process_state_data(state_data);

			// adds array of the form 
			// [state_name, state_data_object]
			state_aggregate_data.push([state].concat(processed_data));
		}
		draw_map('odom-map', state_aggregate_data, 'avg_odom');
		draw_map('age-map', state_aggregate_data, 'avg_age');
		draw_map('msrp-map', state_aggregate_data, 'avg_msrp');

	})
}

function prepare_data_for_switch_bar_chart(grouped_by_make) {
	var first = [["Make", "Stayed", "Switched"]];
	var data = [];
	for (make in grouped_by_make) {
		var transactions = grouped_by_make[make];
		var total = transactions.length;
		var stayed = _.filter(transactions, function(transaction) {
			return transaction[NEW_MAKE] === transaction[OLD_MAKE];
		});
		data.push([make, stayed.length, total - stayed.length]);
	}
	data = _.sortBy(data, function (datum) {
		return -datum[1] - datum[2];
	});
	data = _.filter(data, function (datum) {
		return (datum[1] + datum[2] > 1000);
	});

	data = first.concat(data);
	return data;
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

function process_state_data(data) {
	var year_sum = 0;
	var odom_sum = 0;
	var msrp_sum = 0;

	_.each(data, function(datum) {
		year_sum += datum[OLD_YEAR];
		odom_sum += datum[ODOMETER];
		msrp_sum += datum[MSRP];
	});
	aggregate_data = {
		avg_age: 2010 - year_sum / data.length,
		avg_odom: Math.round(odom_sum / data.length),
		avg_msrp: msrp_sum / data.length,
		transactions: data.length
	}
	return aggregate_data;
}

function determine_bucket(value, bucket_size, max_amount) {
	if (value >= max_amount) return max_amount+"+";
	var rounded = Math.floor(value/bucket_size) * bucket_size;
	return rounded + " - " + (rounded + bucket_size);
}