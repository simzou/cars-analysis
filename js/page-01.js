var filename = "./data/transactions-q1.json";
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

		draw_map('percent-map', state_aggregate_data, 'percent')
	})
}

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
