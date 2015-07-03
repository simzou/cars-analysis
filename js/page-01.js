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

		draw_map('regions_div', state_aggregate_data, 'cost_per_mpg')
	})
}
