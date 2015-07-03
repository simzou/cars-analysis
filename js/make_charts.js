var mappings = {
	'percent' : {
		numberFormat: '.##%',
		tooltipText: 'Percent Improvment: ',
		formatFunction: format_percent,
		colorAxis: {colors: ['white', 'green']},
	},
	'cost_per_mpg': {
		numberFormat: '$.##',
		tooltipText: 'Cost per MPG gained: ',
		formatFunction: format_money,
		colorAxis: {colors: ['green', 'white']},
	},
	'transactions': {
		numberFormat: '',
		tooltipText: 'Number of Car Purchases: ',
		formatFunction: format_number,
		colorAxis: {colors: ['white', 'blue']},
	},
	'avg_age': {
		numberFormat: '',
		tooltipText: 'Average Age of Trade-in Vehicle in Years: ',
		formatFunction: format_number,
		colorAxis: {colors: ['white', 'blue']},
	},
	'avg_odom': {
		numberFormat: '',
		tooltipText: 'Average Odometer Reading of Trade-in Vehicle: ',
		formatFunction: format_number,
		colorAxis: {colors: ['white', 'blue']},
	},
	'avg_msrp': {
		numberFormat: '',
		tooltipText: 'Average MSRP of Vehicle Purchase: ',
		formatFunction: format_money,
		colorAxis: {colors: ['white', 'blue']},
	}

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
	return Number(amount).toLocaleString('en');
}

function draw_google_bar_chart(div_id, data) {
    var data = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Car Transactions by Trade-in Car Year'
    };

    var chart = new google.charts.Bar(document.getElementById(div_id));

    chart.draw(data, options);

}

function draw_map(id, state_data, param) {
	var combined = [];
	_.each(state_data, function(datum){
		combined.push([datum[0], datum[1][param], mappings[param]['tooltipText'] + mappings[param]['formatFunction'](datum[1][param])]);
	});

	//var chart_data = [['State', param]].concat(combined);
    
	var dataTable = new google.visualization.DataTable();
	dataTable.addColumn('string', 'State');
	// Use custom HTML content for the domain tooltip.
	dataTable.addColumn('number', param);
	dataTable.addColumn({type: 'string', role: 'tooltip'});
	dataTable.addRows(combined);

    var options = {
    	region: 'US',
    	resolution: 'provinces',
    	colorAxis: mappings[param]['colorAxis'],
    	legend:{numberFormat:mappings[param]['numberFormat']}
    };

    var chart = new google.visualization.GeoChart(document.getElementById(id));

    chart.draw(dataTable, options);

}

function draw_google_pie_chart(div_id, data) {

    var data = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Car Transactions By Region'
    };

    var chart = new google.visualization.PieChart(document.getElementById(div_id));

    chart.draw(data, options);
}
