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

function draw_google_bar_chart(id, state_data, param){
	var labels = [];
	var costs = [];
	var combined = [];
	_.each(state_data, function(datum) {
		labels.push(datum[0]);
		costs.push(datum[1][param])
		combined.push([datum[0], datum[1][param]]);
	});

	var chart_data = [['State', param]].concat(combined);

    var data = google.visualization.arrayToDataTable(
    	chart_data
    );

    var options = {
      chart: {
        title: param,
      },
		  vAxis: {
		  	minValue: 60,
		  }
    };

    var chart = new google.charts.Bar(document.getElementById(id));
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

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function compile_and_insert_html(template_id, div_id, data) {
	var template = _.template($(template_id).html());
	var template_html = template({
		'rows': data
	});
	$(div_id).html(template_html);
}
